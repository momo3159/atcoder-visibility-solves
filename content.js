
const url = "/contests/typical90/score"

fetch(url)
  .then(response => response.text())
  .then(text => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(text, "text/html")

    const scores = Array.from(doc.getElementsByTagName("tr")).slice(1);
    const info = {}
    scores.forEach(score => {
      const row = score.innerText.replace('\t', '').split('\n')
      const id = row[1].replaceAll('\t', '')
      
      score = row[7].replaceAll('\t', '')
      const subDate = row[8].replaceAll('\t', '')
      info[id] = {score: parseInt(score), sub: subDate};
    })

    const questions = Array.from(document.getElementsByTagName("tr")).slice(1)
    questions.forEach(q => {
      const id_box = q.children[0]
      const id = q.innerText.split('	')[0]
      id_box.children[0].style.color='black'
      // id_box.innerHTML.innerText.style.color = "black"
      if(info[id].score == 0) {
        id_box.style.backgroundColor = '#FF7043'
      } else {
        id_box.style.backgroundColor = '#4FC3F7'
      }
    })
  })