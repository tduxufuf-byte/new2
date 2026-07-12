const steps=[
{q:'С какой сложностью вы столкнулись?',a:[['Плохая кредитная история','◴'],['Есть просрочки или долги','▦'],['Банки уже отказывали','▥'],['Нужна крупная сумма','●'],['Хочу рефинансирование','↻']]},
{q:'На какую сумму вы рассчитываете?',a:[['До 300 000 ₽','●'],['300 000–800 000 ₽','●'],['800 000–1,5 млн ₽','▣'],['Свыше 1,5 млн ₽','▰']]},
{q:'Есть ли у вас текущие задолженности?',a:[['Да, есть просрочки','▦'],['Да, но без просрочек','✓'],['Нет задолженностей','▤'],['Сложно ответить','?']]},
{q:'Какой у вас источник дохода?',a:[['Официальная работа','▰'],['Самозанятость / ИП','○'],['Неофициальный доход','▣'],['Пенсия','▤'],['Другое','?']]},
{q:'Как удобно получить консультацию?',a:[['Телефонный звонок','☎'],['Telegram','➤'],['WhatsApp','◫']]}
];
let cur=0;const log=[];const q=document.getElementById('question'),ans=document.getElementById('answers'),step=document.getElementById('step'),progress=document.getElementById('progress'),back=document.getElementById('back'),modal=document.getElementById('modal');
function render(){step.textContent=`Шаг ${cur+1} из ${steps.length}`;q.textContent=steps[cur].q;progress.innerHTML=steps.map((_,i)=>`<span class="${i<=cur?'active':''}"></span>`).join('');ans.innerHTML='';back.hidden=cur===0;steps[cur].a.forEach(([label,ico])=>{const b=document.createElement('button');b.className='answer';b.innerHTML=`<i>${ico}</i><span>${label}</span><span>›</span>`;b.onclick=()=>{log[cur]=label;if(cur<steps.length-1){cur++;render()}else{modal.hidden=false;document.body.style.overflow='hidden'}};ans.appendChild(b)})}
back.onclick=()=>{if(cur>0){cur--;render()}};
document.querySelectorAll('.goquiz').forEach(b=>b.onclick=()=>document.getElementById('quiz').scrollIntoView({behavior:'smooth',block:'center'}));
document.querySelectorAll('.close').forEach(e=>e.onclick=()=>{modal.hidden=true;document.body.style.overflow=''});
document.getElementById('form').onsubmit=e=>{e.preventDefault();e.target.closest('.modalcard').innerHTML='<div class="check">✓</div><h2>Заявка сохранена</h2><p>Ответы квиза и контактные данные готовы к передаче специалистам вашей команды.</p>';console.log(log)};
render();