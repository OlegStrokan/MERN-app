module.exports = class UserDto {
  public username;
  public _id;
  public role;
  public fullname;
  public email;
  public activationLink;
  public isActivated;
  public posts;

  constructor(model: any) {
    this._id = model._id;
    this.email = model.email;
    this.fullname = model.fullname;
    this.username = model.username;
    this.isActivated = model.isActivated;
    this.activationLink = model.activationLink;
    this.role = model.role;
    this.posts = model.posts;
  }
};
