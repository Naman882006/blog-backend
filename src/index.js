module.exports = {
  register() {},

  async bootstrap({ strapi }) {
    // Configure public permissions for content types
    const roleService = strapi.plugin("users-permissions").service("role");
    const publicRole = await roleService.findOne(1); // 1 = public

    if (publicRole) {
      const permissions = publicRole.permissions;

      const setPermission = (controller, action) => {
        const apiPermissions = permissions[`api::${controller}`];
        const controllerPermissions = apiPermissions?.controllers?.[controller];
        if (controllerPermissions && controllerPermissions[action]) {
          controllerPermissions[action].enabled = true;
        }
      };

      // Enable public permissions
      setPermission("post", "find");
      setPermission("post", "findOne");
      setPermission("category", "find");
      setPermission("tag", "find");
      setPermission("author", "find");

      await roleService.updateRole(1, { permissions });
    }
  },
};


