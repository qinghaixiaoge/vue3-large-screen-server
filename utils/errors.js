class ServiceError extends Error {
    constructor(message, status) {
      super(message);
      this.status = status;
    }
    
    getResponse(){
      return {
          code: false,
          msg: this.message,
          data: null
      }
    }
  }
  
  exports.LoginError = class extends ServiceError {
    constructor(message) {
      super(message, 401);
    }
  }

  exports.UnknownError = class extends ServiceError {
    constructor() {
      super("服务器错误", 500);
    }
  }
  
  