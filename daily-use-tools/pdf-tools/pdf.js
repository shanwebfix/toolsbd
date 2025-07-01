function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

async function mergePdfs() {
  const files = document.getElementById('merge-files').files;
  if (files.length < 2) {
    alert('Select at least two PDFs to merge.');
    return;
  }

  const formData = new FormData();
  for (const file of files) {
    formData.append('pdfs', file);
  }

  const res = await fetch('/merge', {
    method: 'POST',
    body: formData,
  });

  if (res.ok) {
    const blob = await res.blob();
    downloadBlob(blob, 'merged.pdf');
  } else {
    alert('Error merging PDFs.');
  }
}

async function splitPdf() {
  const file = document.getElementById('split-file').files[0];
  if (!file) {
    alert('Select a PDF to split.');
    return;
  }

  const formData = new FormData();
  formData.append('pdf', file);

  const res = await fetch('/split', {
    method: 'POST',
    body: formData,
  });

  if (res.ok) {
    const blob = await res.blob();
    downloadBlob(blob, 'split_pages.zip');
  } else {
    alert('Error splitting PDF.');
  }
}

async function pdfToWord() {
  const file = document.getElementById('pdf-word-file').files[0];
  if (!file) {
    alert('Select a PDF to convert.');
    return;
  }

  const formData = new FormData();
  formData.append('pdf', file);

  const res = await fetch('/pdf-to-word', {
    method: 'POST',
    body: formData,
  });

  if (res.ok) {
    const blob = await res.blob();
    downloadBlob(blob, 'converted.docx');
  } else {
    alert('Error converting PDF to Word.');
  }
}

async function pdfToImages() {
  const file = document.getElementById('pdf-images-file').files[0];
  if (!file) {
    alert('Select a PDF to convert.');
    return;
  }

  const formData = new FormData();
  formData.append('pdf', file);

  const res = await fetch('/pdf-to-images', {
    method: 'POST',
    body: formData,
  });

  if (res.ok) {
    const blob = await res.blob();
    downloadBlob(blob, 'pages_images.zip');
  } else {
    alert('Error converting PDF to images.');
  }
}

async function compressPdf() {
  const file = document.getElementById('compress-file').files[0];
  if (!file) {
    alert('Select a PDF to compress.');
    return;
  }

  const formData = new FormData();
  formData.append('pdf', file);

  const res = await fetch('/compress', {
    method: 'POST',
    body: formData,
  });

  if (res.ok) {
    const blob = await res.blob();
    downloadBlob(blob, 'compressed.pdf');
  } else {
    alert('Error compressing PDF.');
  }
}

