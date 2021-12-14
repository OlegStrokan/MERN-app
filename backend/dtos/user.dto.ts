module.exports = class UserDto {
  username;
  id;
  roles;
  fullname;
  email;
  activationLink;
  constructor(model: any) {
    this.email = model.email;
    this.id = model._id;
    this.roles = model.roles;
    this.username = model.username;
    this.fullname = model.fullname;
    this.activationLink = model.activationLink;
  }
}

