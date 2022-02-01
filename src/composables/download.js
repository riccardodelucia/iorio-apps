export const download = function (data, filename) {
  const link = document.createElement("a");

  link.href = window.URL.createObjectURL(new Blob([data]));

  link.setAttribute("download", filename);

  document.body.appendChild(link);

  link.click();

  link.remove();
  URL.revokeObjectURL(link.href);
};
