import React from 'react'
import '../App.css'

function AlgorithmInfo() {
  return (
    <div className="algorithm-info">
      <div className="algorithm-header">
        <h2>🧠 Алгоритм интервального повторения SM-2</h2>
        <p className="algorithm-subtitle">Научно обоснованный метод эффективного запоминания</p>
      </div>

      <div className="algorithm-content">
        <div className="algorithm-section">
          <h3>📖 Что это такое?</h3>
          <p>
            Алгоритм SM-2 (SuperMemo 2) — это метод интервального повторения, разработанный 
            Петром Возняком в 1987 году. Он основан на научных исследованиях памяти и помогает 
            оптимизировать время повторения материала для максимального запоминания.
          </p>
        </div>

        <div className="algorithm-section">
          <h3>⚙️ Как это работает?</h3>
          <div className="algorithm-steps">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>Оценка качества ответа</h4>
                <p>После каждого повторения вы оцениваете, насколько хорошо знаете материал (0-5 баллов)</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>Расчет интервала</h4>
                <p>Система автоматически рассчитывает, через сколько дней нужно повторить вопрос снова</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4>Адаптация сложности</h4>
                <p>При успешных повторениях интервал увеличивается, при неудачах — уменьшается</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h4>Оптимизация времени</h4>
                <p>Вопросы, которые нужно повторить, автоматически появляются в нужное время</p>
              </div>
            </div>
          </div>
        </div>

        <div className="algorithm-section">
          <h3>📊 Шкала оценки (Quality)</h3>
          <div className="quality-scale">
            <div className="quality-item quality-0">
              <span className="quality-value">0</span>
              <span className="quality-desc">Не знаю — интервал сбрасывается</span>
            </div>
            <div className="quality-item quality-1">
              <span className="quality-value">1</span>
              <span className="quality-desc">Очень плохо — интервал уменьшается</span>
            </div>
            <div className="quality-item quality-2">
              <span className="quality-value">2</span>
              <span className="quality-desc">Плохо — интервал уменьшается</span>
            </div>
            <div className="quality-item quality-3">
              <span className="quality-value">3</span>
              <span className="quality-desc">Нормально — интервал увеличивается</span>
            </div>
            <div className="quality-item quality-4">
              <span className="quality-value">4</span>
              <span className="quality-desc">Хорошо — интервал значительно увеличивается</span>
            </div>
            <div className="quality-item quality-5">
              <span className="quality-value">5</span>
              <span className="quality-desc">Отлично — максимальное увеличение интервала</span>
            </div>
          </div>
        </div>

        <div className="algorithm-section">
          <h3>💡 Преимущества</h3>
          <ul className="advantages-list">
            <li>✅ Экономия времени — повторяете только то, что нужно</li>
            <li>✅ Долгосрочное запоминание — материал остается в памяти надолго</li>
            <li>✅ Научная обоснованность — проверено миллионами пользователей</li>
            <li>✅ Адаптивность — система подстраивается под ваши способности</li>
            <li>✅ Эффективность — до 90% материала запоминается надолго</li>
          </ul>
        </div>

        <div className="algorithm-section">
          <h3>👨‍💻 О разработчике</h3>
          <div className="developer-info">
            <p>
              Это приложение разработано для эффективного изучения и повторения материала. 
              Используя проверенные алгоритмы интервального повторения, оно помогает 
              максимально эффективно использовать время на обучение.
            </p>
            <p>
              <strong>Технологии:</strong> Spring Boot, React, PostgreSQL, Docker
            </p>
            <p>
              <strong>Алгоритм:</strong> SM-2 (SuperMemo 2) by Piotr Wozniak
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AlgorithmInfo

