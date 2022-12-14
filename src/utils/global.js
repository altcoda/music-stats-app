import moment from 'moment';


export const getMinutes = (seconds) => moment().startOf('day').add((seconds / 60), 'minutes').format('m:ss');

export const getYear = (date) => moment(date).year();

export const getDate = (date) => {
    const UTC = moment(date).utc();
    return { 
        YMD: UTC.format('YYYY-MM-DD')
    }
}

export const getAge = (date) => moment().diff(getDate(date).YMD, 'years');

export const parseDateForInput = (date) => getDate(date).YMD;

export const parseInputDate = (str) => moment(str, 'YYYY-MM-DD').toDate();

export const parseHTML = (HTML, replaceValues) => {
    return (
        replaceValues ? 
        { __html: JSON.parse(JSON.stringify(HTML)).replace(replaceValues.join(',')) } :
        { __html: JSON.parse(JSON.stringify(HTML)) }
    )
}
