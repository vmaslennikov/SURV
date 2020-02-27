using System.ComponentModel;

namespace SURV.Models.DB {
    public enum DayTypesEnum {
        [DisplayName("Рабочий день")]
        Work,

        [DisplayName("Нерабочий день")]
        NotWork,

        [DisplayName("Короткий день")]
        Short
    }

    public enum CalendarDayTypesEnum {
        [DisplayName("Командировка")]
        BusinessTrip,

        [DisplayName("Болезнь")]
        Illnes,

        [DisplayName("Отпуск")]
        Vacation,

        [DisplayName("Другое")]
        Other
    }

    public enum PersonWorkType {
        [DisplayName("Штатный сотрудник")]
        Normal,

        [DisplayName("Совместитель")]
        Half
    }
}