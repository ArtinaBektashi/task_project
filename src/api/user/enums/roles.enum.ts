// examples
export enum UserRoles {
  ADMIN = 1,
  MANAGER = 2,
  DEVELOPER = 3,
}

export enum RolePermissions {
  // 1 + 2 + 4 + 8
  SUPER_ADMIN = 15,
  ADMIN = 12,
  USER = 7,
  CUSTOMER = 3,
}