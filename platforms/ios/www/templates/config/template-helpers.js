/**
 * 对日期进行格式化，
 * @param date 要格式化的日期
 * @param format 进行格式化的模式字符串
 *     支持的模式字母有：
 *     y:年,
 *     M:年中的月份(1-12),
 *     d:月份中的天(1-31),
 *     h:小时(0-23),
 *     m:分(0-59),
 *     s:秒(0-59),
 *     S:毫秒(0-999),
 *     q:季度(1-4)
 * @return String
 * @author yanis.wang
 * @see    http://yaniswang.com/frontend/2013/02/16/dateformat-performance/
 */
template.helper('dateFormat', function (date, format) {

    date = new Date(+date);

    var map = {
        "M": date.getMonth() + 1, //月份
        "d": date.getDate(), //日
        "h": date.getHours(), //小时
        "m": date.getMinutes(), //分
        "s": date.getSeconds(), //秒
        "q": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    format = format.replace(/([yMdhmsqS])+/g, function (all, t) {
        var v = map[t];
        if (v !== undefined) {
            if (all.length > 1) {

                v = '0' + v;
                v = v.substr(v.length - 2);
            }
            return v;
        }
        else if (t === 'y') {
            return (date.getFullYear() + '').substr(4 - all.length);
        }
        return all;
    });
    return format;
});

/**
 * 取两个数中较小的一个
 */
template.helper('parseInt', function (a, b) {
    return parseInt(a, b || 10);
});

/**
 * 取两个数中较小的一个
 */
template.helper('min', function (a, b) {
    return Math.min(a, b);
});

/**
 * 取两个数中较大的一个
 */
template.helper('max', function (a, b) {
    return Math.max(a, b);
});

/**
 * 去除文章中的图片
 */
template.helper('stripImages', function (c) {
    return c.replace(/<img[^>]*\/?>/g, '');
});

/*
 * 转义
 */
template.helper('escape', function(c) {
    return escape(c);
});

/*
 * col
 */
template.helper('col', function(a) {
    return 1 + parseInt(a, 10);
});

/*
 * 返回第一张图片
 */
template.helper('firstImg', function(s) {
    return s? s.split('||')[0].split('/^/^')[0] : '';
});
