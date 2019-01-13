export const saveAccountFromUrl = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const accountFromUrl = urlParams.get("account");
  if (accountFromUrl) {
    localStorage.setItem("account", accountFromUrl.toLowerCase());
  }
};

export const getSavedAccount = () => localStorage.getItem("account");

export const isAccountSelected = async () => {
  if (!getSavedAccount()) {
    return false;
  }
  return true;
};
