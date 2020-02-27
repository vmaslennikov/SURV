using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using SURV.Models;
using SURV.Models.DB;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;

namespace SURV.Controllers
{
    [Route("api/Reports")]
    public class ReportsController : Controller
    {
        private readonly Dictionary<String, String> currencies = new Dictionary<string, string> { { "Рубли", "### ### ### ##0.00р" },
            { "Евро", "€### ### ### ##0.00" },
            { "Доллары США", "$### ### ### ##0.00" },
        };

        private readonly System.Drawing.Color colorLightBlue = System.Drawing.Color.FromArgb(204, 254, 255);
        private readonly System.Drawing.Color colorDarkBlue = System.Drawing.Color.FromArgb(153, 204, 255);
        private readonly AppDbContext _db = null;
        private readonly IHostingEnvironment _env = null;

        public ReportsController(AppDbContext db, IHostingEnvironment env)
        {
            _db = db;
            _env = env;
        }

        private static readonly string InvalidFileNameChars = Regex.Escape(new string(Path.GetInvalidFileNameChars()));
        private static readonly string invalidReStr = string.Format(@"[{0}]", InvalidFileNameChars);

        private static string MakeValidFileName(string name)
        {
            //string invalidChars = Regex.Escape(InvalidFileNameChars);
            //string invalidReStr = string.Format(@"[{0}]", invalidChars);
            return Regex.Replace(name, invalidReStr, String.Empty);
        }

        [Route("Pivot"), HttpGet]
        public IActionResult Pivot(int year, int quartal, int companyid)
        {
            byte[] fileContents = null;
            string fileName = "PivotTable";
            try
            {
                using (ExcelPackage excel = new ExcelPackage())
                {
                    var sheetData = excel.Workbook.Worksheets.Add("Данные");
                    var row = 1;
                    sheetData.Cells[row, 1].Value = "День выполнения работы";
                    sheetData.Cells[row, 2].Value = "ФИО сотрудника";
                    sheetData.Cells[row, 3].Value = "ФИО руководителя";
                    sheetData.Cells[row, 4].Value = "Подразделение";
                    sheetData.Cells[row, 5].Value = "Грейд";
                    sheetData.Cells[row, 6].Value = "Клиент";
                    sheetData.Cells[row, 7].Value = "Название проекта";
                    sheetData.Cells[row, 8].Value = "ФИО менеджера проектов";
                    sheetData.Cells[row, 9].Value = "Название услуги";
                    sheetData.Cells[row, 10].Value = "Описание услуги для отчетов";
                    sheetData.Cells[row, 11].Value = "Тип услуги";
                    sheetData.Cells[row, 12].Value = "Результат оказания услуг";
                    sheetData.Cells[row, 13].Value = "Количество часов";
                    sheetData.Cells[row, 14].Value = "Ставка";
                    sheetData.Cells[row, 15].Value = "Валюта";
                    sheetData.Cells[row, 16].Value = "Выручка";
                    sheetData.Cells[row, 17].Value = "Ставка";

                    const string dateShortFormat = "dd.MM.yyyy";
                    fileName = $"{fileName}_y_{year}_q_{quartal}";
                    int[] months = null;
                    switch (quartal)
                    {
                        case 1:
                            months = new int[] { 1, 2, 3 };
                            break;
                        case 2:
                            months = new int[] { 4, 5, 6 };
                            break;
                        case 3:
                            months = new int[] { 7, 8, 9 };
                            break;
                        case 4:
                            months = new int[] { 10, 11, 12 };
                            break;
                        default:
                            break;
                    }
                    if (months != null)
                    {
                        using (_db)
                        {
                            var items = _db.PivotDataItems.Where(o => o.CompanyId == companyid && o.Year == year && months.Contains(o.Month)).ToList();
                            items.ForEach(o =>
                            {
                                row++;
                                sheetData.Cells[row, 1].Value = o.Date.ToString(dateShortFormat);
                                sheetData.Cells[row, 2].Value = o.pFullname;
                                sheetData.Cells[row, 3].Value = o.mFullname;
                                sheetData.Cells[row, 4].Value = o.unitTitle;
                                sheetData.Cells[row, 5].Value = o.gradeTitle;
                                sheetData.Cells[row, 6].Value = o.clientTitle;
                                sheetData.Cells[row, 7].Value = o.projectTitle;
                                sheetData.Cells[row, 8].Value = o.pmFullname;
                                sheetData.Cells[row, 9].Value = o.serviceTtile;
                                sheetData.Cells[row, 10].Value = CleanHtml(o.Comment);
                                sheetData.Cells[row, 11].Value = o.servicetypeTitle;
                                sheetData.Cells[row, 12].Value = CleanHtml(o.Result);
                                sheetData.Cells[row, 13].Value = o.Hours;
                                sheetData.Cells[row, 14].Value = o.Sum;
                                sheetData.Cells[row, 15].Value = o.Currency;
                                sheetData.Cells[row, 16].Value = o.TtlSum;
                                sheetData.Cells[row, 17].Value = $"{o.Sum} {o.Currency}";
                            });
                            for (int rowIndex = 1; rowIndex <= row; rowIndex++)
                            {
                                for (int cellIndex = 1; cellIndex < 18; cellIndex++)
                                {
                                    sheetData.Cells[rowIndex, cellIndex].Style.WrapText = true;
                                    sheetData.Cells[rowIndex, cellIndex].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                                    sheetData.Cells[rowIndex, cellIndex].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                                    sheetData.Cells[rowIndex, cellIndex].Style.Border.Top.Style = ExcelBorderStyle.Dashed;
                                    sheetData.Cells[rowIndex, cellIndex].Style.Border.Left.Style = ExcelBorderStyle.Dashed;
                                    sheetData.Cells[rowIndex, cellIndex].Style.Border.Right.Style = ExcelBorderStyle.Dashed;
                                    sheetData.Cells[rowIndex, cellIndex].Style.Border.Bottom.Style = ExcelBorderStyle.Dashed;
                                    sheetData.Cells[rowIndex, cellIndex].Style.Font.Name = "Arial";
                                    sheetData.Cells[rowIndex, cellIndex].Style.Font.Size = 10;
                                }
                            }
                            sheetData.DefaultColWidth = 15;
                            //define the data range on the source sheet
                            var dataRange = sheetData.Cells[sheetData.Dimension.Address];
                            // sheetData.Cells.AutoFitColumns ();

                            var sheetPivot = excel.Workbook.Worksheets.Add("Сводная таблица");
                            //create the pivot table
                            var pivotTable = sheetPivot.PivotTables.Add(sheetPivot.Cells["A1"], dataRange, "PivotTable");
                            pivotTable.DataOnRows = false;
                            foreach (var f in pivotTable.Fields)
                            {
                                f.Outline = f.Compact = false;
                            }
                            pivotTable.StyleName = "";
                            pivotTable.Compact = false;
                        }
                    }
                    fileContents = excel.GetAsByteArray();
                }
            }
            catch (Exception) { }
            return File(
                fileContents: fileContents,
                contentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                fileDownloadName: $"{fileName}.xlsx"
            );
        }

        [Route("ByClient"), HttpGet]
        public IActionResult ByClient(int year, int quartal, int clientid)
        {
            byte[] fileContents = null;
            string fileName = $"_y_{year}_q_{quartal}";
            DateTime from = DateTime.Now;
            DateTime till = DateTime.Now;
            var months = Array.Empty<int>();
            switch (quartal)
            {
                case 1:
                    from = new DateTime(year, 1, 1);
                    till = new DateTime(year, 4, 1).AddMilliseconds(-1);
                    months = new int[] { 1, 2, 3 };
                    break;
                case 2:
                    from = new DateTime(year, 4, 1);
                    till = new DateTime(year, 7, 1).AddMilliseconds(-1);
                    months = new int[] { 4, 5, 6 };
                    break;
                case 3:
                    from = new DateTime(year, 7, 1);
                    till = new DateTime(year, 10, 1).AddMilliseconds(-1);
                    months = new int[] { 7, 8, 9 };
                    break;
                case 4:
                    from = new DateTime(year, 10, 1);
                    till = new DateTime(year + 1, 1, 1).AddMilliseconds(-1);
                    months = new int[] { 10, 11, 12 };
                    break;
            }
            try
            {
                using (_db)
                {
                    var client = _db.Clients.FirstOrDefault(c => c.Id == clientid);
                    fileName = client != null ? MakeValidFileName($"{client.Title}{fileName}") : $"noname{fileName}";
                    var pathToExcel = Path.Combine(
                        _env.WebRootPath,
                        "App_Data",
                        client.NonResident ? "_reportnotres.xlsx" : "_report.xlsx"
                    );
                    // получим и заполним данные о командировках
                    var userDays = _db.Usercalendars.Include(o => o.Person).Where(c =>
                          c.Person != null &&
                          c.DayType == CalendarDayTypesEnum.BusinessTrip &&
                          c.ClientId == clientid &&
                          (c.DateFrom <= till && c.DateTill >= from))
                        .OrderBy(o => o.Person.FullName)
                        .ToList();
                    var userCalendar = new Dictionary<string, int>();
                    userDays.ForEach(o =>
                    {
                        for (DateTime i = o.DateFrom.Value; i <= o.DateTill.Value;)
                        {
                            userCalendar.Add($"{o.PersonId}_{i.Date.ToString("yyyy.MM.dd")}", 0);
                            i = i.AddDays(1);
                        }
                    });
                    // получим и заполним данные о часах
                    var hoursData = _db.Wsshours
                        .Include(h => h.Serviceline)
                        .Include(h => h.Serviceline.Project)
                        .Include(h => h.Serviceline.Service)
                        .Include(h => h.Serviceline.Tabel)
                        .Include(h => h.Serviceline.Tabel.Person)
                        .Where(h =>
                           h.Serviceline.ClientId == clientid &&
                           h.Serviceline.Tabel.Year == year &&
                           months.Contains(h.Serviceline.Tabel.Month)).
                    Select(o => new
                    {
                        projectTitle = o.Serviceline.Project.Title,
                        serviceTitle = o.Serviceline.Service.Title,
                        pId = o.Serviceline.Tabel.PersonId,
                        pFullName = o.Serviceline.Tabel.Person.FullName,
                        date = o.Date,
                        hours = o.Hours
                    })
                        .ToList();
                    var currFormatTo = new List<string>() { "K", "M", "U", "Z", "AA", "AB", "AD", "AE" };
                    var symbols = new List<string>() { "L", "M", "N", "O", "P", "R", "S", "T", "U", "X", "Y", "Z", "AA", "AB", "AD", "AE" };
                    var fileinfo = new FileInfo(pathToExcel);
                    if (fileinfo.Exists)
                    {
                        var row = 9;
                        const int startRow = 9;

                        using (ExcelPackage excel = new ExcelPackage(fileinfo))
                        {
                            var sheet = excel.Workbook.Worksheets.FirstOrDefault();
                            var items = _db.ByClientDataItems.Where(o => o.Year == year && o.Quartal == quartal && o.ClientId == clientid).ToList();
                            var f = items.FirstOrDefault()?.costCurrency;
                            var currMask = f != null && currencies.ContainsKey(f) ? currencies[f] : currencies.FirstOrDefault().Value;
                            var ttIndex = new List<int>();
                            var groupByProject = items.GroupBy(o => o.projectTitle);
                            foreach (var gByProj in groupByProject)
                            {
                                int gByProjStartIndex = row;
                                int rowsByProject = gByProj.Count();
                                sheet.Cells[$"E{row}"].Value = gByProj.Key;
                                var groupByServices = gByProj.GroupBy(o => o.serviceTitle);
                                foreach (var groupByService in groupByServices)
                                {
                                    int gByServiceStartIndex = row;
                                    int rowsByService = groupByService.Count();
                                    sheet.Cells[$"F{row}"].Value = groupByService.Key;
                                    var groupByPersons = groupByService.GroupBy(o => o.pFullName);
                                    foreach (var groupByPerson in groupByPersons)
                                    {
                                        sheet.Cells[$"G{row}"].Value = string.Join("\n\n", groupByPerson.Select(o => o.Result).ToList());
                                        sheet.Cells[$"I{row}"].Value = groupByPerson.Key;
                                        sheet.Cells[$"J{row}"].Value = groupByPerson.FirstOrDefault()?.gradeTitle;
                                        sheet.Cells[$"K{row}"].Value = groupByPerson.FirstOrDefault()?.costByHours;
                                        sheet.Cells[$"L{row}"].Value = groupByPerson.Sum(o => o.SumByQuartal);
                                        sheet.Cells[$"M{row}"].Formula = $"=L{row}*K{row}";

                                        var byPerson = hoursData.Where(o =>
                                           o.pFullName == groupByPerson.Key &&
                                           o.projectTitle == gByProj.Key &&
                                           o.serviceTitle == groupByService.Key).ToList();
                                        var sumByRow = 0.0;
                                        byPerson.ForEach(d =>
                                        {
                                            var temp = 0.0;
                                            var key = $"{d.pId}_{d.date.ToString("yyyy.MM.dd")}";
                                            if (userCalendar.ContainsKey(key))
                                            {
                                                temp = 1.0 * d.hours / 8.0;
                                            }
                                            sumByRow += temp;
                                        });
                                        sheet.Cells[$"N{row}"].Value = sumByRow; // TODO добавить расчет данных о днях в командировке

                                        sheet.Cells[$"U{row}"].Formula = $"=O{row}+P{row}+Q{row}+R{row}+S{row}+T{row}";
                                        sheet.Cells[$"Z{row}"].Formula = $"=X{row}+Y{row}";

                                        sheet.Cells[$"AA{row}"].Formula = $"=U{row}+Z{row}";
                                        sheet.Cells[$"AB{row}"].Formula = $"=M{row}+AA{row}";
                                        sheet.Cells[$"AD{row}"].Formula = $"=AB{row}*18%";
                                        sheet.Cells[$"AE{row}"].Formula = $"=AB{row}+AD{row}";

                                        currFormatTo.ForEach(c => sheet.Cells[$"{c}{row}"].Style.Numberformat.Format = currMask);
                                        sheet.Cells[$"I{row}:AE{row}"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                                        row++;
                                    }
                                    if (rowsByService > 1)
                                    {
                                        sheet.Cells[$"F{gByServiceStartIndex}:F{row - 1}"].Merge = true;
                                    }
                                }
                                if (rowsByProject > 1)
                                {
                                    sheet.Cells[$"E{gByProjStartIndex}:E{row - 1}"].Merge = true;
                                }

                                sheet.Cells[$"L{row}:AE{row}"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                                sheet.Cells[$"I{row}:K{row}"].Merge = true;
                                sheet.Cells[$"I{row}"].Value = "Итого:";
                                sheet.Cells[$"I{row}"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Right;
                                sheet.Cells[$"I{row}:AE{row}"].Style.Font.Bold = true;
                                sheet.Cells[$"I{row}:AE{row}"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                                sheet.Cells[$"I{row}:AE{row}"].Style.Fill.BackgroundColor.SetColor(colorDarkBlue);
                                symbols.ForEach(s =>
                                {
                                    sheet.Cells[$"{s}{row}"].Formula = $"=SUM({s}{gByProjStartIndex}:{s}{row - 1})";
                                });

                                sheet.Cells[$"AD{row}"].Formula = $"=AB{row}*18%";
                                currFormatTo.ForEach(c => sheet.Cells[$"{c}{row}"].Style.Numberformat.Format = currMask);

                                ttIndex.Add(row);
                                row++;
                            }

                            if (row != startRow)
                            {
                                if (items.Count > 1)
                                {
                                    sheet.Cells[$"A{startRow}:A{row - 1}"].Merge = true;
                                    sheet.Cells[$"B{startRow}:B{row - 1}"].Merge = true;
                                    sheet.Cells[$"C{startRow}:C{row - 1}"].Merge = true;
                                    sheet.Cells[$"D{startRow}:D{row - 1}"].Merge = true;
                                    sheet.Cells[$"H{startRow}:H{row - 1}"].Merge = true;
                                }
                                sheet.Cells[$"D{row}"].Value = 1;

                                sheet.Cells[$"E{startRow}:G{row - 1}"].Style.VerticalAlignment = ExcelVerticalAlignment.Top;
                                sheet.Cells[$"E{startRow}:G{row - 1}"].Style.WrapText = true;

                                sheet.Cells[$"A{row}:K{row}"].Merge = true;
                                sheet.Cells[$"A{row}"].Value = "Всего:";
                                sheet.Cells[$"A{row}"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Right;
                                sheet.Cells[$"A{row}:AE{row}"].Style.Font.Bold = true;
                                sheet.Cells[$"A{row}:AE{row}"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                                sheet.Cells[$"A{row}:AE{row}"].Style.Fill.BackgroundColor.SetColor(colorLightBlue);

                                symbols.ForEach(s =>
                                {
                                    sheet.Cells[$"{s}{row}"].Formula = $"={string.Join("+", ttIndex.Select(o => $"{s}{o}"))}";
                                });
                                sheet.Cells[$"L{row}:AE{row}"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                                sheet.Cells[$"AC{row}"].Formula = $"=100%-(D9*100%)/AB{row}";
                                sheet.Cells[$"AC{row}"].Style.Numberformat.Format = "##0,00 %";
                                sheet.Cells[$"A9:AE{row}"].Style.Border.Top.Style =
                                    sheet.Cells[$"A9:AE{row}"].Style.Border.Left.Style =
                                    sheet.Cells[$"A9:AE{row}"].Style.Border.Right.Style =
                                    sheet.Cells[$"A9:AE{row}"].Style.Border.Bottom.Style = ExcelBorderStyle.Dashed;
                            }
                            currFormatTo.ForEach(c => sheet.Cells[$"{c}{row}"].Style.Numberformat.Format = currMask);

                            excel.Workbook.Calculate();
                            //define the data range on the source sheet
                            //sheet.Cells.AutoFitColumns ();
                            fileContents = excel.GetAsByteArray();
                        }
                    }
                }
            }
            catch (Exception) { }
            return File(
                fileContents: fileContents,
                contentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                fileDownloadName: $"{fileName}.xlsx"
            );
        }

        private static readonly Regex r1 = new Regex(@"\<(.+?)\>", RegexOptions.IgnoreCase | RegexOptions.Multiline | RegexOptions.Compiled);
        private static readonly Regex r2 = new Regex(@"\</(.+?)\>", RegexOptions.IgnoreCase | RegexOptions.Multiline | RegexOptions.Compiled);
        private static readonly Regex r3 = new Regex(@"\[(.+?)\]", RegexOptions.IgnoreCase | RegexOptions.Multiline | RegexOptions.Compiled);
        private static readonly Regex r4 = new Regex(@"\[/(.+?)\]", RegexOptions.IgnoreCase | RegexOptions.Multiline | RegexOptions.Compiled);

        /// <summary>
        /// Очищает строку от тегов html
        /// </summary>
        /// <param name="text"></param>
        /// <returns></returns>
        private static string CleanHtml(string text)
        {
            if (string.IsNullOrEmpty(text))
            {
                return text;
            }

            text = r1.Replace(text, "");
            text = r2.Replace(text, "");
            text = r3.Replace(text, "");
            text = r4.Replace(text, "");
            text = text.Replace("&nbsp;", " ");
            return text;
            // text = Regex.Replace(text, @"\<(.+?)\>", "", RegexOptions.IgnoreCase | RegexOptions.Multiline | RegexOptions.Compiled);
            // text = Regex.Replace(text, @"\</(.+?)\>", "", RegexOptions.IgnoreCase | RegexOptions.Multiline | RegexOptions.Compiled);
            // text = Regex.Replace(text, @"\[(.+?)\]", "", RegexOptions.IgnoreCase | RegexOptions.Multiline | RegexOptions.Compiled);
            // text = Regex.Replace(text, @"\[/(.+?)\]", "", RegexOptions.IgnoreCase | RegexOptions.Multiline | RegexOptions.Compiled);
            // var b = new StringBuilder (text);
            // b.Replace (String.Format ("{0}", Environment.NewLine), String.Empty);
            // b.Replace ("\n", String.Empty);
            // b.Replace ("\r", String.Empty);
            // b.Replace ("&nbsp;", " ");
            // return b.ToString ();
        }
    }
}