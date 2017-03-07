(function (root, client) {
  if (typeof define === 'function' && define.amd) {
    define(['popsicle'], client)
  } else if (typeof exports === 'object') {
    module.exports = client(require('popsicle'))
  } else {
    root.InstagramApi = client(root.popsicle)
  }
})(this, function (popsicle) {
  var TEMPLATE_REGEXP = /\{([^\{\}]+)\}/g

  /**
   * @param  {String} string
   * @param  {Object} interpolate
   * @param  {Object} defaults
   * @return {String}
   */
  function template (string, interpolate, defaults) {
    defaults = defaults || {}
    interpolate = interpolate || {}

    return string.replace(TEMPLATE_REGEXP, function (match, key) {
      if (interpolate[key] != null) {
        return encodeURIComponent(interpolate[key])
      }

      if (defaults[key] != null) {
        return encodeURIComponent(defaults[key])
      }

      return ''
    })
  }

  /**
   * @param  {Object} dest
   * @param  {Object} ...source
   * @return {Object}
   */
  function extend (dest /*, ...source */) {
    for (var i = 1; i < arguments.length; i++) {
      for (var key in arguments[i]) {
        dest[key] = arguments[i][key]
      }
    }

    return dest
  }

  function handleRequest (client, path, method, body, options) {
    options = extend({}, client.options, options)

    var baseUri = template(options.baseUri, options.baseUriParameters)
    var hasBody = method !== 'GET' && method !== 'HEAD'
    var reqOpts = {}

    var reqBody = hasBody && body != null ? body : options.body
    var reqQuery = !hasBody && body != null ? body : options.query

    var reqOpts = {
      url: baseUri.replace(/\/$/, '') + path,
      method: method,
      headers: extend({}, options.headers),
      body: reqBody,
      query: typeof reqQuery === 'object' ? extend({}, reqQuery) : reqQuery
    }

    if (options.user && typeof options.user.sign === 'function') {
      options.user.sign(reqOpts)
    }

    return client.request(reqOpts)
  }

  function Resource0 (uri, client) {
    this._uri = uri
    this._client = client

    this.media = new Resource1(uri + '/media', client)
    this.tags = new Resource8(uri + '/tags', client)
    this.users = new Resource13(uri + '/users', client)
    this.oembed = new Resource27(uri + '/oembed', client)
    this.p = new Resource28(uri + '/p', client)
    this.locations = new Resource31(uri + '/locations', client)
    this.geographies = new Resource36(uri + '/geographies', client)
  }


  function Resource1 (uri, client) {
    this._uri = uri
    this._client = client

    this.search = new Resource6(uri + '/search', client)
    this.popular = new Resource7(uri + '/popular', client)
  }

  Resource1.prototype.mediaId = function (/* ...args */) {
    var uri = this._uri + template('/{0}', arguments, [undefined])

    return new Resource2(uri, this._client)
  }

  function Resource2 (uri, client) {
    this._uri = uri
    this._client = client

    this.comments = new Resource3(uri + '/comments', client)
    this.likes = new Resource5(uri + '/likes', client)
  }


  Resource2.prototype.get = function (body, options) {
    return handleRequest(this._client, this._uri, 'GET', body, options)
  }
  function Resource3 (uri, client) {
    this._uri = uri
    this._client = client

  }

  Resource3.prototype.commentId = function (/* ...args */) {
    var uri = this._uri + template('/{0}', arguments, [undefined])

    return new Resource4(uri, this._client)
  }

  Resource3.prototype.get = function (body, options) {
    return handleRequest(this._client, this._uri, 'GET', body, options)
  }
  Resource3.prototype.post = function (body, options) {
    return handleRequest(this._client, this._uri, 'POST', body, options)
  }
  function Resource4 (uri, client) {
    this._uri = uri
    this._client = client

  }


  Resource4.prototype.delete = function (body, options) {
    return handleRequest(this._client, this._uri, 'DELETE', body, options)
  }
  function Resource5 (uri, client) {
    this._uri = uri
    this._client = client

  }


  Resource5.prototype.get = function (body, options) {
    return handleRequest(this._client, this._uri, 'GET', body, options)
  }
  Resource5.prototype.post = function (body, options) {
    return handleRequest(this._client, this._uri, 'POST', body, options)
  }
  Resource5.prototype.delete = function (body, options) {
    return handleRequest(this._client, this._uri, 'DELETE', body, options)
  }
  function Resource6 (uri, client) {
    this._uri = uri
    this._client = client

  }


  Resource6.prototype.get = function (body, options) {
    return handleRequest(this._client, this._uri, 'GET', body, options)
  }
  function Resource7 (uri, client) {
    this._uri = uri
    this._client = client

  }


  Resource7.prototype.get = function (body, options) {
    return handleRequest(this._client, this._uri, 'GET', body, options)
  }
  function Resource8 (uri, client) {
    this._uri = uri
    this._client = client

    this.search = new Resource12(uri + '/search', client)
  }

  Resource8.prototype.tagName = function (/* ...args */) {
    var uri = this._uri + template('/{0}', arguments, [undefined])

    return new Resource9(uri, this._client)
  }

  function Resource9 (uri, client) {
    this._uri = uri
    this._client = client

    this.media = new Resource10(uri + '/media', client)
  }


  Resource9.prototype.get = function (body, options) {
    return handleRequest(this._client, this._uri, 'GET', body, options)
  }
  function Resource10 (uri, client) {
    this._uri = uri
    this._client = client

    this.recent = new Resource11(uri + '/recent', client)
  }


  function Resource11 (uri, client) {
    this._uri = uri
    this._client = client

  }


  Resource11.prototype.get = function (body, options) {
    return handleRequest(this._client, this._uri, 'GET', body, options)
  }
  function Resource12 (uri, client) {
    this._uri = uri
    this._client = client

  }


  Resource12.prototype.get = function (body, options) {
    return handleRequest(this._client, this._uri, 'GET', body, options)
  }
  function Resource13 (uri, client) {
    this._uri = uri
    this._client = client

    this.search = new Resource22(uri + '/search', client)
    this.self = new Resource23(uri + '/self', client)
  }

  Resource13.prototype.userId = function (/* ...args */) {
    var uri = this._uri + template('/{0}', arguments, [undefined])

    return new Resource14(uri, this._client)
  }

  function Resource14 (uri, client) {
    this._uri = uri
    this._client = client

    this.follows = new Resource15(uri + '/follows', client)
    this.followedBy = new Resource16(uri + '/followed-by', client)
    this.self = new Resource17(uri + '/self', client)
    this.media = new Resource19(uri + '/media', client)
    this.relationship = new Resource21(uri + '/relationship', client)
  }


  Resource14.prototype.get = function (body, options) {
    return handleRequest(this._client, this._uri, 'GET', body, options)
  }
  function Resource15 (uri, client) {
    this._uri = uri
    this._client = client

  }


  Resource15.prototype.get = function (body, options) {
    return handleRequest(this._client, this._uri, 'GET', body, options)
  }
  function Resource16 (uri, client) {
    this._uri = uri
    this._client = client

  }


  Resource16.prototype.get = function (body, options) {
    return handleRequest(this._client, this._uri, 'GET', body, options)
  }
  function Resource17 (uri, client) {
    this._uri = uri
    this._client = client

    this.requestedBy = new Resource18(uri + '/requested-by', client)
  }


  function Resource18 (uri, client) {
    this._uri = uri
    this._client = client

  }


  Resource18.prototype.get = function (body, options) {
    return handleRequest(this._client, this._uri, 'GET', body, options)
  }
  function Resource19 (uri, client) {
    this._uri = uri
    this._client = client

    this.recent = new Resource20(uri + '/recent', client)
  }


  function Resource20 (uri, client) {
    this._uri = uri
    this._client = client

  }


  Resource20.prototype.get = function (body, options) {
    return handleRequest(this._client, this._uri, 'GET', body, options)
  }
  function Resource21 (uri, client) {
    this._uri = uri
    this._client = client

  }


  Resource21.prototype.get = function (body, options) {
    return handleRequest(this._client, this._uri, 'GET', body, options)
  }
  Resource21.prototype.post = function (body, options) {
    return handleRequest(this._client, this._uri, 'POST', body, options)
  }
  function Resource22 (uri, client) {
    this._uri = uri
    this._client = client

  }


  Resource22.prototype.get = function (body, options) {
    return handleRequest(this._client, this._uri, 'GET', body, options)
  }
  function Resource23 (uri, client) {
    this._uri = uri
    this._client = client

    this.feed = new Resource24(uri + '/feed', client)
    this.media = new Resource25(uri + '/media', client)
  }


  function Resource24 (uri, client) {
    this._uri = uri
    this._client = client

  }


  Resource24.prototype.get = function (body, options) {
    return handleRequest(this._client, this._uri, 'GET', body, options)
  }
  function Resource25 (uri, client) {
    this._uri = uri
    this._client = client

    this.liked = new Resource26(uri + '/liked', client)
  }


  function Resource26 (uri, client) {
    this._uri = uri
    this._client = client

  }


  Resource26.prototype.get = function (body, options) {
    return handleRequest(this._client, this._uri, 'GET', body, options)
  }
  function Resource27 (uri, client) {
    this._uri = uri
    this._client = client

  }


  Resource27.prototype.get = function (body, options) {
    return handleRequest(this._client, this._uri, 'GET', body, options)
  }
  function Resource28 (uri, client) {
    this._uri = uri
    this._client = client

  }

  Resource28.prototype.shortcode = function (/* ...args */) {
    var uri = this._uri + template('/{0}', arguments, [undefined])

    return new Resource29(uri, this._client)
  }

  function Resource29 (uri, client) {
    this._uri = uri
    this._client = client

    this.media = new Resource30(uri + '/media', client)
  }


  function Resource30 (uri, client) {
    this._uri = uri
    this._client = client

  }


  Resource30.prototype.get = function (body, options) {
    return handleRequest(this._client, this._uri, 'GET', body, options)
  }
  function Resource31 (uri, client) {
    this._uri = uri
    this._client = client

    this.search = new Resource35(uri + '/search', client)
  }

  Resource31.prototype.locId = function (/* ...args */) {
    var uri = this._uri + template('/{0}', arguments, [undefined])

    return new Resource32(uri, this._client)
  }

  function Resource32 (uri, client) {
    this._uri = uri
    this._client = client

    this.media = new Resource33(uri + '/media', client)
  }


  Resource32.prototype.get = function (body, options) {
    return handleRequest(this._client, this._uri, 'GET', body, options)
  }
  function Resource33 (uri, client) {
    this._uri = uri
    this._client = client

    this.recent = new Resource34(uri + '/recent', client)
  }


  function Resource34 (uri, client) {
    this._uri = uri
    this._client = client

  }


  Resource34.prototype.get = function (body, options) {
    return handleRequest(this._client, this._uri, 'GET', body, options)
  }
  function Resource35 (uri, client) {
    this._uri = uri
    this._client = client

  }


  Resource35.prototype.get = function (body, options) {
    return handleRequest(this._client, this._uri, 'GET', body, options)
  }
  function Resource36 (uri, client) {
    this._uri = uri
    this._client = client

  }

  Resource36.prototype.geoId = function (/* ...args */) {
    var uri = this._uri + template('/{0}', arguments, [undefined])

    return new Resource37(uri, this._client)
  }

  function Resource37 (uri, client) {
    this._uri = uri
    this._client = client

    this.media = new Resource38(uri + '/media', client)
  }


  function Resource38 (uri, client) {
    this._uri = uri
    this._client = client

    this.recent = new Resource39(uri + '/recent', client)
  }


  function Resource39 (uri, client) {
    this._uri = uri
    this._client = client

  }


  Resource39.prototype.get = function (body, options) {
    return handleRequest(this._client, this._uri, 'GET', body, options)
  }

  function CustomResource (uri, client) {
    this._uri = uri
    this._client = client
  }

  CustomResource.prototype.acl = function (body, options) {
    return handleRequest(this._client, this._uri, 'ACL', body, options)
  }
  CustomResource.prototype.bind = function (body, options) {
    return handleRequest(this._client, this._uri, 'BIND', body, options)
  }
  CustomResource.prototype.checkout = function (body, options) {
    return handleRequest(this._client, this._uri, 'CHECKOUT', body, options)
  }
  CustomResource.prototype.connect = function (body, options) {
    return handleRequest(this._client, this._uri, 'CONNECT', body, options)
  }
  CustomResource.prototype.copy = function (body, options) {
    return handleRequest(this._client, this._uri, 'COPY', body, options)
  }
  CustomResource.prototype.delete = function (body, options) {
    return handleRequest(this._client, this._uri, 'DELETE', body, options)
  }
  CustomResource.prototype.get = function (body, options) {
    return handleRequest(this._client, this._uri, 'GET', body, options)
  }
  CustomResource.prototype.head = function (body, options) {
    return handleRequest(this._client, this._uri, 'HEAD', body, options)
  }
  CustomResource.prototype.link = function (body, options) {
    return handleRequest(this._client, this._uri, 'LINK', body, options)
  }
  CustomResource.prototype.lock = function (body, options) {
    return handleRequest(this._client, this._uri, 'LOCK', body, options)
  }
  CustomResource.prototype.mSearch = function (body, options) {
    return handleRequest(this._client, this._uri, 'M-SEARCH', body, options)
  }
  CustomResource.prototype.merge = function (body, options) {
    return handleRequest(this._client, this._uri, 'MERGE', body, options)
  }
  CustomResource.prototype.mkactivity = function (body, options) {
    return handleRequest(this._client, this._uri, 'MKACTIVITY', body, options)
  }
  CustomResource.prototype.mkcalendar = function (body, options) {
    return handleRequest(this._client, this._uri, 'MKCALENDAR', body, options)
  }
  CustomResource.prototype.mkcol = function (body, options) {
    return handleRequest(this._client, this._uri, 'MKCOL', body, options)
  }
  CustomResource.prototype.move = function (body, options) {
    return handleRequest(this._client, this._uri, 'MOVE', body, options)
  }
  CustomResource.prototype.notify = function (body, options) {
    return handleRequest(this._client, this._uri, 'NOTIFY', body, options)
  }
  CustomResource.prototype.options = function (body, options) {
    return handleRequest(this._client, this._uri, 'OPTIONS', body, options)
  }
  CustomResource.prototype.patch = function (body, options) {
    return handleRequest(this._client, this._uri, 'PATCH', body, options)
  }
  CustomResource.prototype.post = function (body, options) {
    return handleRequest(this._client, this._uri, 'POST', body, options)
  }
  CustomResource.prototype.propfind = function (body, options) {
    return handleRequest(this._client, this._uri, 'PROPFIND', body, options)
  }
  CustomResource.prototype.proppatch = function (body, options) {
    return handleRequest(this._client, this._uri, 'PROPPATCH', body, options)
  }
  CustomResource.prototype.purge = function (body, options) {
    return handleRequest(this._client, this._uri, 'PURGE', body, options)
  }
  CustomResource.prototype.put = function (body, options) {
    return handleRequest(this._client, this._uri, 'PUT', body, options)
  }
  CustomResource.prototype.rebind = function (body, options) {
    return handleRequest(this._client, this._uri, 'REBIND', body, options)
  }
  CustomResource.prototype.report = function (body, options) {
    return handleRequest(this._client, this._uri, 'REPORT', body, options)
  }
  CustomResource.prototype.search = function (body, options) {
    return handleRequest(this._client, this._uri, 'SEARCH', body, options)
  }
  CustomResource.prototype.subscribe = function (body, options) {
    return handleRequest(this._client, this._uri, 'SUBSCRIBE', body, options)
  }
  CustomResource.prototype.trace = function (body, options) {
    return handleRequest(this._client, this._uri, 'TRACE', body, options)
  }
  CustomResource.prototype.unbind = function (body, options) {
    return handleRequest(this._client, this._uri, 'UNBIND', body, options)
  }
  CustomResource.prototype.unlink = function (body, options) {
    return handleRequest(this._client, this._uri, 'UNLINK', body, options)
  }
  CustomResource.prototype.unlock = function (body, options) {
    return handleRequest(this._client, this._uri, 'UNLOCK', body, options)
  }
  CustomResource.prototype.unsubscribe = function (body, options) {
    return handleRequest(this._client, this._uri, 'UNSUBSCRIBE', body, options)
  }

  function Client (options) {
    this.options = extend({
      baseUri: 'https://api.instagram.com/{version}',
      baseUriParameters: {version:'v1'}
    }, options)

    this.resources = new Resource0('', this)
  }

  Client.prototype.resource = function (route, parameters) {
    var path = '/' + template(route, parameters).replace(/^\//, '')

    return new CustomResource(path, this)
  }

  Client.prototype.request = popsicle
  Client.prototype.form = Client.form = popsicle.form
  Client.prototype.version  = 'v1'


  return Client
})
