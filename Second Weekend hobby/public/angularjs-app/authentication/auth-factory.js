angular.module("meanBasketball").factory("AuthFactory", AuthFactory);

function AuthFactory() {
  const auth = { ifLoggedId: false };
  return {
    auth: auth,
  };
}
