"use strict";

module.exports = async (policyContext, config, { strapi }) => {
  const { state } = policyContext;

  if (!state.user) {
    return false;
  }

  const user = state.user;

  // Check if user has admin role
  if (user && user.role && user.role.type === "admin") {
    return true;
  }

  return false;
};


