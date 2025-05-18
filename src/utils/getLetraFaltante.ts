export const getLetraFaltante = (nome: string) => {
  const letras = new Set(nome.toLowerCase().replace(/[^a-z]/g, ''));
  for (let i = 97; i <= 122; i++) {
    const letra = String.fromCharCode(i);
    if (!letras.has(letra)) return letra;
  }
  return '-';
};