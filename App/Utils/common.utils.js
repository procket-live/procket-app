/**
 * Function to convert price into indian numbering system
 * like 10000 will be 10,000
 * @param  {number} price can be float or integer
 */
export function DisplayPrice(price, showAbsValue = false) {

    if (IsUndefined(price)) {
        return price;
    }

    let sign = showAbsValue ? '' : parseFloat(price) < 0 ? '-' : '';
    price = Math.abs(price);
    let number = price;
    if (!isNaN(number)) {
        number = parseFloat(number);
        number = number.toFixed(2);
    }
    if (typeof number == 'number') {
        number = number.toString();
    }
    let afterPoint = '';

    if (number && number.indexOf('.') > 0) {
        afterPoint = number.substring(number.indexOf('.'), number.length);
    }
    number = Math.floor(number);
    number = number.toString();
    let lastThree = number.substring(number.length - 3);
    const otherNumbers = number.substring(0, number.length - 3);
    if (otherNumbers != '') {
        lastThree = ',' + lastThree;
    }
    let res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree + afterPoint;
    return `₹ ${sign}${res}`;
}

/**
 * return boolean if given variable is undefined or null
 * @param  {} value
 */
export function IsUndefinedOrNull(value) {
    return value == null || value == '';
}

/**
 * return boolean if given variable is undefined only
 * @param  {} value
 */
export function IsUndefined(value) {
    return value == null || value === '';
}

export function GetChecksum(response) {
    const responseData = response.replace('onTransactionResponseBundle', '').replace('{', '').replace('}', '').replace('[', '').replace(']', '').replace(',', '');
    const arr = responseData.split('=');
    return arr[2];
}