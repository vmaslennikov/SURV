using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using SURV.Models;
using SURV.Models.DB;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;

namespace SURV.Controllers
{
    [Route("api/Files")]
    public class FilesController : Controller
    {
        private readonly AppDbContext _db = null;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public FilesController(AppDbContext db, IHttpContextAccessor httpContextAccessor)
        {
            _db = db;
            _httpContextAccessor = httpContextAccessor;
        }

        public static string GetContentType(string fileName)
        {
            var provider = new FileExtensionContentTypeProvider();
            string contentType;
            if (!provider.TryGetContentType(fileName, out contentType))
            {
                contentType = "application/octet-stream";
            }
            return contentType;
        }

        [Route("Download"), HttpGet]
        public IActionResult Download(int fileid)
        {
            byte[] fileContents = null;
            string filename = null;
            string contentType = null;
            try
            {
                using (_db)
                {
                    var f = _db.Docs.First(o => o.Id == fileid);
                    if (f != null)
                    {
                        filename = f.Title;
                        contentType = GetContentType(filename);
                        // var folderName = Path.Combine ("wwwroot", "Resources", "Files");
                        // var pathToSave = Path.Combine (Directory.GetCurrentDirectory (), folderName);
                        var filepath = Path.Combine(Directory.GetCurrentDirectory(), f.Path); // Path.Combine (pathToSave, f.Title);
                        if (System.IO.File.Exists(filepath))
                        {
                            fileContents = System.IO.File.ReadAllBytes(filepath);
                        }
                    }
                }
            }
            catch (Exception)
            {
            }
            return File(
                fileContents: fileContents,
                contentType: contentType, // "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                fileDownloadName: filename
            );
        }

        [Route("Upload"), HttpPost, DisableRequestSizeLimit]
        public IActionResult Upload([FromQuery(Name = "f")] string folder)
        {
            try
            {
                var file = Request.Form.Files.FirstOrDefault();
                var folderName = Path.Combine("wwwroot", "Resources", "Files");
                if (!string.IsNullOrEmpty(folder))
                {
                    folderName = Path.Combine(folderName, folder);
                }
                else
                {
                    folderName = Path.Combine(folderName, "0");
                }
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                if (!System.IO.Directory.Exists(pathToSave))
                {
                    System.IO.Directory.CreateDirectory(pathToSave);
                }
                if (file == null || file?.Length == 0)
                {
                    return BadRequest();
                }

                var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                var fullPath = Path.Combine(pathToSave, fileName);
                var dbPath = Path.Combine(folderName, fileName);
                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    file.CopyTo(stream);
                }
                using (_db)
                {
                    var f = _db.Docs.FirstOrDefault(filedata => filedata.Title == fileName);
                    if (f == null)
                    {
                        f = new Filedata();
                        _db.Docs.Add(f);
                    }
                    f.Title = fileName;
                    f.Length = file.Length;
                    f.Path = dbPath;
                    f.Active = true;
                    _db.SaveChanges();
                }
                return Ok(new { dbPath });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [Route("MultiUpload"), HttpPost, DisableRequestSizeLimit]
        public IActionResult MultiUpload()
        {
            try
            {
                var files = Request.Form.Files;
                var folderName = Path.Combine("wwwroot", "Resources", "Files");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

                if (files.Count == 1 && files.Any(f => f.Length == 0))
                {
                    return BadRequest();
                }
                var paths = new List<string>();
                using (_db)
                {
                    foreach (var file in files)
                    {
                        if ((file?.Length ?? 0) == 0)
                        {
                            continue;
                        }
                        var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                        var fullPath = Path.Combine(pathToSave, fileName);
                        var dbPath = Path.Combine(folderName, fileName); //you can add this path to a list and then return all dbPaths to the client if require
                        paths.Add(dbPath);
                        using (var stream = new FileStream(fullPath, FileMode.Create))
                        {
                            file.CopyTo(stream);
                        }
                        var f = _db.Docs.FirstOrDefault(filedata => filedata.Title == fileName);
                        if (f == null)
                        {
                            f = new Filedata();
                            _db.Docs.Add(f);
                        }
                        f.Title = fileName;
                        f.Length = file.Length;
                        f.Path = dbPath;
                        f.Active = true;
                    }
                    _db.SaveChanges();
                }
                return Ok(new { Items = paths });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}