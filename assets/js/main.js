document.addEventListener('DOMContentLoaded', () => {
  const adviceRefreshButton = document.getElementById('adviceRefreshButton')
  const adviceCard = document.getElementById('adviceCard')

  if(adviceRefreshButton != null){
    adviceRefreshButton.addEventListener('click', () => refreshAdvice(adviceCard))
  }
})

async function getAdvice(){
  const API_URL = 'https://api.adviceslip.com/advice'  
  const response = await fetch(API_URL)
  
  return response.json()
}

function refreshAdvice(adviceCard){
  if(adviceCard != null){
    try{
      adviceCard.classList.remove('error')
      adviceCard.classList.add('out')

      getAdvice().then(advice => {
        adviceCard.classList.add('out')

        let adviceText = advice.slip.advice

        if(adviceText !== null && adviceText.length > 0){
          adviceMessage.innerHTML = adviceText
        }

        if(advice.slip.id !== null && advice.slip.id > 0){
          adviceTitle.innerHTML = advice.slip.id
        }
        adviceCard.classList.remove('out')
      })
    }catch(error){
      adviceCard.classList.remove('out')
      adviceCard.classList.add('error')
    }
  }
}