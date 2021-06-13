import formatDistance from "date-fns/formatDistance";
// import format from "date-fns/format";
import ruLang from "date-fns/locale/ru";

export const formatDate = (date: Date): string => {
    console.log(new Date());
    
    return formatDistance(
        date,
        new Date(),
        {locale: ruLang, }
    )
}