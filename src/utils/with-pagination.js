module.exports = (req, data) => {
  // Obtém os parâmetros de paginação da query
  const currentPage = parseInt(req.query.page) || 1; // Padrão para página 1
  const perPage = parseInt(req.query.limit) || 10;   // Padrão para 10 itens por página

  // Cálculo do índice inicial e final
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
    console.log({data});
    
  // Itens paginados
  const items = data.slice(startIndex, endIndex);

  // Total de itens
  const total = data.length;

  // Retorna a resposta no formato solicitado
  const paginatedResponse = {
    items,
    current_page: currentPage,
    per_page: perPage,
    total: total
  };

  // Envia a resposta
  return paginatedResponse;
}
