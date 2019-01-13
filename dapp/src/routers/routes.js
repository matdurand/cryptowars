export const LANDING = {
  path: "/",
  exact: true,
  strict: false
};

export const NEW_WARRIOR = {
  path: "/warrior/new",
  exact: true,
  strict: false
};

export const CHALLENGE_WARRIOR = {
  path: "/challenge/:warriorId",
  exact: true,
  strict: false
};

export const ACCEPT_CHALLENGE = {
  path: "/challenge/accept/:defender/:challenger",
  exact: true,
  strict: false
};

export const CHALLENGE_RESULT = {
  path:
    "/challenge/result/:defender/:defenderPower/:challenger/:challengerPower/:winner",
  exact: true,
  strict: false
};

export const CLAIM_FREE_WEAPON = {
  path: "/weapon/claim/:warrior",
  exact: true,
  strict: false
};
