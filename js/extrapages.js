async function onLoadExtraPages() {
  await includeHTML();
  updateHeaderInitials();
}

async function onLoadExtraPagesExternal() {
  await includeHTML();
  updateLinksExternalPage();
}

async function updateLinksExternalPage() {
  document.getElementById("privacyLink").href = "privacyPolicyExternal.html";
  document.getElementById("legalNoticeLink").href = "legalNoticeExternal.html";
}
