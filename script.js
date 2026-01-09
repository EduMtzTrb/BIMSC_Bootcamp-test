function showToast(message, timeout = 2500){
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.hidden = false;
  toast.style.opacity = '1';
  setTimeout(()=>{
    toast.hidden = true;
  }, timeout);
}

(() => {
  const email = "Ed.martineztoribio@gmail.com";

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const toastEl = document.getElementById("toast");
  function toast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.hidden = false;
    window.clearTimeout(toastEl._t);
    toastEl._t = window.setTimeout(() => {
      toastEl.hidden = true;
      toastEl.textContent = "";
    }, 2200);
  }

  const copyBtn = document.getElementById("copyEmailBtn");
  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(email);
        toast("Email copied to clipboard.");
      } catch {
        // Fallback for older browsers
        const ta = document.createElement("textarea");
        ta.value = email;
        ta.setAttribute("readonly", "");
        ta.style.position = "absolute";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        toast("Email copied.");
      }
    });
  }

  const printBtn = document.getElementById("printBtn");
  if (printBtn) {
    printBtn.addEventListener("click", () => window.print());
  }

  // Optional: smooth scroll for internal anchor links
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.pushState(null, "", id);
    });
  });
})();
