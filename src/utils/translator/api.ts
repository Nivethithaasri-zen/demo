
export async function translateText(text: string, targetLanguage: string) {
  const response = await fetch('/api/translator', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ text, targetLanguage })
  });
  if (!response.ok) throw new Error('Failed to translate');
  return await response.json();
}
