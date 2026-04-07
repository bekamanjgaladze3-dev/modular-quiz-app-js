
export async function quizQuestionsFromAPI(level) {
  const res = await fetch(`https://opentdb.com/api.php?amount=30&difficulty=${level}&type=multiple`);
  const data = await res.json();
  return data.results;
}