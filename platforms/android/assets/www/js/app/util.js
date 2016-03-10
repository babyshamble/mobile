var FUNCTION = typeof function(){};

/*
 * 加载一张图片
 *
 * 图片成功加载完成时执行指定的回调函数
 * 加载失败时将执行执行失败函数
 *
 * @method loadImg
 * @param {String} src - 要加载的图片地址
 * @param {Function} [success] - 成功时执行的回调函数,图片的地址将作为回调函数的唯一参数
 * @param {Function} [fail] - 失败时执行的回调函数,图片的地址将作为回调函数的唯一参数
 * @return {Void}
 */
function loadImg(src, success, fail) {
    var img;

    img = new Image();

    if (FUNCTION === typeof success) {
        img.onload = function() {
            success.call(img, src);
        }
    }

    if (FUNCTION === typeof fail) {
        img.onerror = function() {
            fail.call(img, src);
        }
    }

    img.src = src;
}