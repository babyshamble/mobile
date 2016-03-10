if(typeof undefined === typeof YX) YX = {};
if(typeof undefined === typeof YX.Mobile) YX.Mobile = {};

YX.Mobile.Sitemap = function(){

    var isInited = false,
        resolvedSystemData = {
        },
        lastResolveGroupId = undefined,
        lastResolveGroupData = undefined,
        siteMapApi = undefined;

    siteMapApi = new YX.Data();

    this.init = function() {
        if (true === isInited) {
            return this;
        }

        isInited = true;
    };

    this.isCache = function(isCache) {
        siteMapApi.cache.IsCache = !!isCache;
    };


    /**
     * 加载体系结构
     * @method system
     * @return {Void}
     */
    this.system = function(e) {
        return new Promise(function(resolve, reject) {

            siteMapApi.Cate(null, null, function(res, err) {
                if (!res) {
                    reject('ESERVERFAIL');
                    return;
                }

                if ('true' !== res.success || !res.data) {
                    reject('ENOTREADY');
                    return;
                }

                resolvedSystemData[e] = res;

                resolve(res);
            }, e);

        });
    };

    /**
     * 加载网站的地图
     * @method system
     * @param {String} wid - 网站的id
     * @return {Void}
     */
    this.map = function(wid, e) {
        return new Promise(function(resolve, reject) {

            siteMapApi.Map(wid, function(res, err) {

                if (!res) {
                    reject('ESERVERFAIL');
                    return;
                }

                 resolve(res);
                // resolve({
                //     sid: res.sid,
                //     code: res.code,
                //     map: res.data,
                //     sort: res.sortkeys
                // });

            }, e);

        });

    };

    //加载更多二级目录下的子类信息
    this.more = function(groupId) {
        return new Promise(function(resolve, reject) {

            siteMapApi.More(groupId, function(res, err) {

                if (!res) {
                    reject('ESERVERFAIL');
                    return;
                }

                if ((res.success !== 'true' && res.success !== true) || !res.data) {
                    reject('ENOTREADY');
                    return;
                }

                resolve(res);
            });

        });
    };

    //加载正文
    this.article = function(artId, e){
        return new Promise(function(resolve, reject) {

            siteMapApi.Art(artId, function(res, err) {

                if (!res) {
                    reject('ESERVERFAIL');
                    return;
                }

                if ((res.success !== 'true' && res.success !== true) || !res.data) {
                    reject('ENOTREADY');
                    return;
                }

                resolve(res);

            }, e);
        });
    };

    //加载列表
    this.list = function(listId, e, pno, pco, sid) {
        return new Promise(function(resolve, reject) {

            siteMapApi.List(listId, function(res, err) {

                if (!res) {
                    reject('ESERVERFAIL');
                    return;
                }

                if ((res.success !== 'true' && res.success !== true) || !res.data) {
                    reject('ENOTREADY');
                    return;
                }

                resolve(res);

            }, pno, pco, sid, e);

        });
    };

    // 分页加载一个一级栏目下的所有新闻列表
    this.listAllInOne = function(targetListIds) {
        var self = this,
            lists = [];

        return new Promose(function(resolve, reject) {
        });
    };
};

