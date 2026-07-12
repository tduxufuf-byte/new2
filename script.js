const modal=document.getElementById('modal');let selectedAnswer='';
function openModal(answer=''){selectedAnswer=answer;modal.hidden=false;document.body.style.overflow='hidden'}
function closeModal(){modal.hidden=true;document.body.style.overflow=''}
document.querySelector('.hotspot-cta').addEventListener('click',()=>document.querySelector('.quiz-hotspots button').focus());
document.querySelectorAll('.quiz-hotspots button').forEach(btn=>btn.addEventListener('click',()=>openModal(btn.dataset.answer||'')));
document.querySelectorAll('[data-close]').forEach(el=>el.addEventListener('click',closeModal));
document.getElementById('lead-form').addEventListener('submit',e=>{
 e.preventDefault();
 const card=e.target.closest('.modal-card');
 card.innerHTML=`<div class="modal-check">✓</div><h2>Заявка сохранена</h2><p>Выбранный вариант: <strong>${selectedAnswer||'не указан'}</strong>.</p><p>Форма демонстрационная. Для реальной отправки подключается Telegram, CRM или почта.</p><button type="button" id="done-close" style="width:100%;border:0;border-radius:12px;padding:15px;background:#0f8b4c;color:#fff;font-weight:700;font-size:16px;cursor:pointer">Закрыть</button>`;
 document.getElementById('done-close').addEventListener('click',closeModal);
});
