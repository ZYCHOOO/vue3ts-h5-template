export default {
  // http响应状态码
  HTTP_STATUS: {
    // 1xx，临时响应
    TEMP_RESPOND: {
      Continue: 100, // 服务器通知浏览器之前一切正常，请客户端继续请求，如果请求结束，可忽略
      SwitchingProtocal: 101 // 针对请求头的Upgrade返回的信息。表明服务器正在切换到指定的协议
    },
    // 2xx，成功
    SUCCESS: {
      Ok: 200, // 请求成功
      Created: 201, // 常用于POST，PUT 请求，表明请求已经成功，并新建了一个资源。并在响应体中返回路径
      Accepted: 202, // 请求已经接收到，但没有响应，稍后也不会返回一个异步请求结果。 该状态码适用于等待其他进程处理或者批处理的场景
      NoAuthoritativeInformation: 203, // 表明响应返回的元信息（meta-infomation）和最初的服务器不同，而是从本地或者第三方获取的
      NoContent: 204, // 请求没有数据返回，但是头信息有用。用户代理(浏览器)会更新缓存的头信息
      ResetContent: 205, // 告诉用户代理（浏览器）重置发送该请求的文档
      ParticalContent: 206 // 客户端使用Range请求头时，返回该状态码
    },
    // 3xx，重定向
    REDIRECT: {
      MultipleChoice: 300, // 返回多个响应，需要浏览器或者用户选择
      MovedPermanently: 301, // 请求资源的URL被永久的改变，新的URL会在响应的Location中给出。浏览器到新的URL重新请求资源，因为有些客户端会把请求方式method改成GET。所以该状态码建议GET和HEAD方法中使用。搜索引擎会更新地址到资源的链接（SEO中‘link-judge’被发送到新的URL）
      Found: 302, // 请求资源的URL被暂时修改到Location提供的URL。未来可能还会有新的修改。览器会根据新的URL重新请求资源。有些客户端会把方法method改为GET，建议在GET和HEAD方法中使用。搜索引擎不会更改URL到资源的。
      SeeOther: 303, // 服务通过返回的响应数据指导客户端通过GET方法去另一个URL获取资源。通常用于POST或者PUT的请求返回结果，重定向到信息提示页面或者进度展示页面。重定向页面的方法是GET方法。
      NotModified: 304, // 资源未变更。服务器根据请求头判断，需要资源未修改，只返回响应头；否则将资源一起返回。
      TemporaryRedirect: 307, // 临时重定向。基本和302相同。唯一的区别是这个状态码严格禁止浏览器到新URL请求资源时修改原来的请求方式和请求体。
      PermanentRedirect: 308 // 永久重定向。基本和301相同。但是严格禁止修改请求方式和请求体。
    },
    // 4xx，请求错误
    REQUEST_ERROR: {
      BadRequest: 400, // 请求语法有问题，服务器无法识别。
      UnAuthorized: 401, // 客户端未授权该请求。缺乏有效的身份认证凭证，一般可能是未登陆。登陆后一般都解决问题。
      Forbidden: 403, // 服务器拒绝响应。权限不足。
      NotFound: 404, // URL无效或者URL有效但是没有资源。
      MethodNotAllowed: 405, // 请求方式Method不允许。但是GET和HEAD属于强制方式，不能返回这个状态码。
      NotAccepted: 406, // 资源类型不符合服务器要求。
      ProxyAuthorizationRequired: 407, //  需要代理授权。
      RequestTimeout: 408, // 服务器将不再使用的连接关闭。响应头会有Connection: close。
      UpgradeRequired: 426 // 告诉客户端需要升级通信协议。
    },
    // 5xx，服务器错误
    SERVER_ERROR: {
      InternalServerError: 500, // 服务器内部错误，未捕获。
      BadGateway: 502, // 服务器作为网关使用时，收到上游服务器返回的无效响应。
      ServiceUnavailable: 503, // 无法服务。一般发生在因维护而停机或者服务过载。一般还会伴随着返回一个响应头Retry-After: 说明恢复服务的估计时间。
      GateTimeout: 504, // 网关超时。服务器作为网关或者代理，不能及时从上游服务器获取响应返回给客户端。
      HttpVersionNotSupported: 505 // 发出的请求http版本服务器不支持。如果请求通过http2发送，服务器不支持http2.0，就会返回该状态码。
    }
  },
  // http状态码
  CODES: {
    Success: 200,
    UnAuthorized: 401
  },
  // http状态码白名单，在具体业务中处理
  ERRCODE_WHITE_LIST: []
}
