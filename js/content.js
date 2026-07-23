/* 恩恩統計家教 Enen Statistics - 2026–27 AP® Statistics 5 大單元雙語教學資料庫 */

const DEFAULT_PAID_STUDENTS = [
  {
    email: "demo.student@gmail.com",
    name: "張小明 (Demo Student)",
    allowedUnits: ["u1", "u2", "u3"],
    joinedDate: "2026-07-01",
    note: "已繳費 Unit 1~3 課程"
  },
  {
    email: "enen.vip@gmail.com",
    name: "李大華 (VIP 全修生)",
    allowedUnits: ["u1", "u2", "u3", "u4", "u5", "exam"],
    joinedDate: "2026-06-15",
    note: "AP 5分全修保證班"
  }
];

const COURSE_DATA = {
  courseTitle: "2026–27 AP® Statistics 雙語家教主要教學入口",
  subtitle: "Official 5-Unit Framework Companion · 恩恩老師專屬伴讀系統",
  
  units: [
    {
      id: "u1",
      code: "Unit 1",
      badgeColor: "#00f2fe",
      title: "Exploring One-Variable Data & Data Collection",
      subtitle: "單變數資料分析、統計圖表、常態分布與抽樣實驗設計",
      description: "涵蓋觀察單位與變數分類、SOCS 分布描述法則、1.5×IQR 極端值檢定、Standardized Z-Score、抽樣方法 (SRS, Stratified, Cluster) 與實驗設計 (Random Assignment, Blocking)。",
      modules: [
        {
          id: "u1-m1",
          code: "Topic 1.1 - 1.4",
          title: "Categorical & Quantitative Data (資料類型與類別圖表)",
          summary: "區分 Categorical 與 Quantitative 變數，掌握相對次數 (Relative Frequency) 與分層條形圖分析。",
          studentContent: `
            <div class="concept-box">
              <div class="concept-title">💡 Key Concepts (核心觀念)</div>
              <p><strong>Categorical Variables (類別變數)</strong>：將觀察對象歸類至不同類別（如：血型、血清型、車輛等級）。摘要指標為比例 (Proportions) 或百分比。</p>
              <p><strong>Quantitative Variables (數值變數)</strong>：具備算術意義的數值（如：身高、血壓、考試分數）。區分為 Discrete (離散型) 與 Continuous (連續型)。</p>
            </div>

            <h3>1. Frequency & Relative Frequency Bar Charts</h3>
            <p>分析類別資料時，應注意：</p>
            <ul>
              <li><strong>Frequency (次數)</strong>：該類別出現的筆數 \( count \)。</li>
              <li><strong>Relative Frequency (相對次數)</strong>：該類別比例 \( \frac{count}{n} \)。在比較不同樣本數的兩組資料時，必須使用 Relative Frequency！</li>
            </ul>

            <div class="ti84-box">
              <div class="ti84-title">📱 TI-84 Plus CE 計算機實作步驟</div>
              <p>1. 按 <code>STAT</code> &rarr; <code>1: Edit...</code>，在 L1 輸入類別編號 (如 1, 2, 3)，在 L2 輸入次數 (Frequency)。</p>
              <p>2. 按 <code>2nd</code> + <code>Y=</code> (STAT PLOT) &rarr; 開啟 <code>Plot1</code> &rarr; 選擇 Bar Chart 圖示。</p>
            </div>

            <div class="code-snippet-box">
              <div class="code-header"><span>Python 實作範例 (Seaborn / Pandas)</span><a href="https://colab.research.google.com" target="_blank" class="colab-link">🚀 Open in Colab</a></div>
              <pre><code>import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

df = pd.DataFrame({'Grade': ['A', 'B', 'A', 'C', 'B', 'A', 'B', 'A', 'A', 'C']})
rel_freq = df['Grade'].value_counts(normalize=True)
print("Relative Frequencies:\n", rel_freq)

sns.countplot(data=df, x='Grade', palette='mako')
plt.title("AP Statistics Grade Distribution")
plt.show()</code></pre>
            </div>

            <div class="warning-box">
              <div class="warning-title">⚠️ AP 考試常見扣分陷阱 (Exam Trap Alert)</div>
              <p>在繪製長條圖 (Bar Chart) 時，柱子與柱子之間<strong>必須留有空隙 (Gaps)</strong>；若柱子相連則為直方圖 (Histogram)，這是 AP 閱卷老師必扣分的魔鬼細節！</p>
            </div>

            <h3>✍️ Class Exercise (課堂家教練習題)</h3>
            <p><strong>Question 1:</strong> 一家科技公司調查 200 名員工之作業系統（macOS, Windows, Linux）。結果 macOS 占 80 人，Windows 占 100 人，Linux 占 20 人。請計算各作業系統的 Relative Frequency，並說明若比較男女員工的作業系統偏好時，為何不能直接使用 Frequency？</p>
          `,
          teacherContent: `
            <div class="teacher-only-header">🔑 Teacher Answer Key & Rubrics (解答與評分標準)</div>
            <p><strong>Question 1 解答：</strong></p>
            <ul>
              <li>macOS Relative Frequency: \( \frac{80}{200} = 0.40 \) (40%)</li>
              <li>Windows Relative Frequency: \( \frac{100}{200} = 0.50 \) (50%)</li>
              <li>Linux Relative Frequency: \( \frac{20}{200} = 0.10 \) (10%)</li>
            </ul>
            <p><strong>解釋原因：</strong> 若男女員工總人數不同（例如男員工 150 人，女員工 50 人），直接比較次數 (Frequency) 會造成誤導，必須使用相對比例 (Relative Frequencies) 才能進行公正比較。</p>

            <div class="rubric-box">
              <strong>🎯 AP Scoring Rubric:</strong>
              <ul>
                <li><strong>Essentially Correct (E)</strong>：正確算出三個相對次數 (0.40, 0.50, 0.10) 並明確指出因「總人數可能不同 (different sample sizes)」故需使用相對比例。</li>
                <li><strong>Partially Correct (P)</strong>：算對比例但未解釋原因，或僅指出次數不同未強調 sample size 差異。</li>
              </ul>
            </div>

            <div style="margin-top:1rem; color:var(--accent-gold);">
              <strong>💡 備課提示 (Teacher Notes)：</strong>
              <p>引導學生連結 Unit 2 的 Segmented Bar Charts 與 Two-Way Tables，預告條件比例 (Conditional Relative Frequencies) 的概念。</p>
            </div>
          `
        },
        {
          id: "u1-m2",
          code: "Topic 1.5 - 1.9",
          title: "Quantitative Distributions, SOCS & 1.5 IQR Rule",
          summary: "精通以 SOCS 法則描述單變數數值分布、1.5×IQR 極端值檢定與 Standardized Z-Score。",
          studentContent: `
            <div class="concept-box">
              <div class="concept-title">💡 SOCS 分布描述黃金法則</div>
              <p>在 AP Statistics 中描述數值型分布時，解答必須包含下列四大要素 (SOCS)：</p>
              <ul>
                <li><strong>S - Shape (形狀)</strong>：Symmetric (對稱), Skewed Left (左偏/負偏), Skewed Right (右偏/正偏), Unimodal/Bimodal。</li>
                <li><strong>O - Outliers (極端值)</strong>：是否有明顯偏離群體的數值（需經 1.5×IQR 檢定）。</li>
                <li><strong>C - Center (集中趨勢)</strong>：Mean (平均數 \(\bar{x}\)) 或 Median (中位數)。偏態時建議用 Median！</li>
                <li><strong>S - Spread (變異程度)</strong>：Range, IQR (\(Q_3 - Q_1\)) 或 Standard Deviation (\(s_x\))。</li>
              </ul>
            </div>

            <h3>1. 1.5×IQR Outlier Detection Rule (極端值檢定法則)</h3>
            <p>定義 Interquartile Range: \( \text{IQR} = Q_3 - Q_1 \)</p>
            <p>邊界公式 (Fences)：</p>
            <ul>
              <li><strong>Lower Fence (下界)</strong> = \( Q_1 - 1.5 \times \text{IQR} \)</li>
              <li><strong>Upper Fence (上界)</strong> = \( Q_3 + 1.5 \times \text{IQR} \)</li>
            </ul>

            <div class="ti84-box">
              <div class="ti84-title">📱 TI-84 計算 5-Number Summary & Boxplot 步驟</div>
              <p>1. <code>STAT</code> &rarr; <code>CALC</code> &rarr; <code>1: 1-Var Stats</code> &rarr; 取得 \(\bar{x}, s_x, Q_1, Med, Q_3\)。</p>
              <p>2. <code>STAT PLOT</code> 選擇具備 Outlier 點標示的 Modified Boxplot 圖示。</p>
            </div>

            <h3>2. Standardized Z-Score & Empirical Rule</h3>
            <p>\[ z = \frac{x - \mu}{\sigma} \]</p>
            <p><strong>68-95-99.7 Rule (Empirical Rule)</strong>：常態分布中約 68% 資料落於 \(\mu \pm 1\sigma\)，95% 落於 \(\mu \pm 2\sigma\)，99.7% 落於 \(\mu \pm 3\sigma\)。</p>

            <h3>✍️ Class Exercise (課堂家教練習題)</h3>
            <p><strong>Question 2:</strong> 某組資料的 5-Number Summary 為 Min = 12, \(Q_1 = 28\), Median = 40, \(Q_3 = 50\), Max = 88。請判定數值 88 是否為 Outlier？若該分布為 Skewed Right，請比較 Mean 與 Median 的大小關係。</p>
          `,
          teacherContent: `
            <div class="teacher-only-header">🔑 Teacher Answer Key & Rubrics (解答與評分標準)</div>
            <p><strong>Question 2 解答：</strong></p>
            <ol>
              <li>計算 \( \text{IQR} = Q_3 - Q_1 = 50 - 28 = 22 \)</li>
              <li>計算 Upper Fence \( = Q_3 + 1.5 \times \text{IQR} = 50 + 1.5(22) = 50 + 33 = 83 \)</li>
              <li>比較：因為 \( 88 > 83 \)，故數值 88 判定為 **Outlier**。</li>
              <li>因為分布為 Skewed Right (右偏)，極端大值會將平均數拉高，因此 **Mean > Median**。</li>
            </ol>
            <div class="rubric-box">
              <strong>🎯 AP Scoring Rubric:</strong>
              <ul>
                <li><strong>E (Essentially Correct)</strong>：正確算出 Upper Fence=83，寫出 \( 88 > 83 \) 的數值比較，並正確指出 Mean > Median。</li>
                <li><strong>P (Partially Correct)</strong>：算出 83 但未做數值比較，或未正確比較 Mean 與 Median。</li>
              </ul>
            </div>
          `
        },
        {
          id: "u1-m3",
          code: "Topic 1.10 - 1.13",
          title: "Sampling Methods, Bias & Experimental Design (抽樣與實驗)",
          summary: "區分 Simple Random Sample (SRS)、Stratified與Cluster抽樣，分析偏誤類型與因果推論前提。",
          studentContent: `
            <div class="concept-box">
              <div class="concept-title">💡 Sampling Methods & Experimental Design 核心觀念</div>
              <p><strong>Simple Random Sample (SRS)</strong>：總體中每個大小為 \(n\) 的子集被抽中的機率皆相同。</p>
              <p><strong>Stratified Sampling (分層抽樣)</strong>：先將母體按特徵分為同質的 Strata (如年級)，再從每個 Stratum 中進行 SRS。縮小變異數 (Reduces Variability)。</p>
              <p><strong>Cluster Sampling (群集抽樣)</strong>：將母體分為異質的 Clusters (如班級)，隨機抽取數個 Clusters 並對選中 Cluster 進行全查。節省成本 (Cost-effective)。</p>
            </div>

            <h3>1. Types of Bias (常見抽樣偏誤)</h3>
            <ul>
              <li><strong>Undercoverage (覆蓋不足)</strong>：抽樣框 (Sampling frame) 漏掉母體中某些特定族群。</li>
              <li><strong>Nonresponse Bias (無回答偏誤)</strong>：被抽中的個體拒絕回答或無法聯繫，其特徵與回答者有顯著差異。</li>
              <li><strong>Response Bias (回答偏誤)</strong>：問卷措辭引導、訪員壓力或受訪者說謊導致結果偏離真實。</li>
            </ul>

            <h3>2. Principles of Experimental Design (實驗設計四大原則)</h3>
            <p><strong>1. Control (對照)</strong> | <strong>2. Random Assignment (隨機分派)</strong> | <strong>3. Replication (重複性)</strong> | <strong>4. Blocking (區組設計)</strong></p>
            <div class="warning-box">
              <div class="warning-title">⚠️ Cause-and-Effect vs Generalization</div>
              <p>只有具備 **Random Assignment (隨機分派)** 才能建立 **Cause-and-Effect (因果關係)**！<br>只有具備 **Random Selection (隨機抽樣)** 才能將結論 **Generalize to Population (推廣至整體母體)**！</p>
            </div>
          `,
          teacherContent: `
            <div class="teacher-only-header">🔑 Teacher Answer Key & Rubrics (解答與評分標準)</div>
            <p><strong>備課重點與常考觀念：</strong></p>
            <p>強調 Confounding Variable (混淆變數) 的定義：同時與被解釋變數及解釋變數相關，導致無法釐清因果關係。BLOCKING 是消除已知潛在混淆變數的最佳武器！</p>
          `
        }
      ]
    },
    {
      id: "u2",
      code: "Unit 2",
      badgeColor: "#f5d061",
      title: "Exploring Two-Variable Data & Regression",
      subtitle: "雙變數資料分析、散佈圖、最小二乘迴歸線 (LSRL) 與殘差圖分析",
      description: "深入探討 Scatterplots、相關係數 $r$、$r^2$ 判定係數、LSRL 迴歸方程式 $y = a + bx$、Residual Plot 殘差圖判讀與對數轉換模式。",
      modules: [
        {
          id: "u2-m1",
          code: "Topic 2.1 - 2.9",
          title: "Linear Regression, Residuals & Influential Points",
          summary: "掌握 Scatterplots 四要素 (DOFS)、LSRL 斜率與截距情境解釋、殘差圖判讀與極端點 (High-Leverage) 分析。",
          studentContent: `
            <div class="concept-box">
              <div class="concept-title">💡 Describing Scatterplots: DOFS 法則</div>
              <ul>
                <li><strong>D - Direction (方向)</strong>：Positive, Negative, or No Association.</li>
                <li><strong>O - Outliers (異常點)</strong>：偏離整體迴歸趨勢的點。</li>
                <li><strong>F - Form (型態)</strong>：Linear (線性) or Non-linear.</li>
                <li><strong>S - Strength (強度)</strong>：Strong, Moderate, or Weak (依據 $r$ 決定).</li>
              </ul>
            </div>

            <h3>1. Least-Squares Regression Line (LSRL)</h3>
            <p>\[ \hat{y} = a + b x \quad \text{where Slope } b = r \frac{s_y}{s_x}, \quad \text{Intercept } a = \bar{y} - b \bar{x} \]</p>

            <div class="frq-template-box">
              <div class="frq-template-title">📝 AP Standard Phrasing (滿分答題模板)</div>
              <p><strong>Slope Interpretation:</strong> "For each additional 1 [unit of X], the predicted [Y variable] [increases/decreases] by [b units] on average."</p>
              <p><strong>$r^2$ Interpretation:</strong> "About [r² × 100]% of the variability in [Y variable] is accounted for by the linear relationship with [X variable]."</p>
            </div>

            <h3>2. Residuals & Residual Plot (殘差與殘差圖)</h3>
            <p>\[ \text{Residual} = e = y - \hat{y} = \text{Actual} - \text{Predicted} \quad (\text{記法: AP}) \]</p>
            <p>若 Residual Plot 呈現無規律的**隨機分布 (Random scatter around zero)**，代表線性模型高度適用！若呈現曲線彎曲圖樣 (Curved pattern)，則代表線性模型不適合。</p>

            <div class="ti84-box">
              <div class="ti84-title">📱 TI-84 線性迴歸計算步驟</div>
              <p>1. <code>STAT</code> &rarr; <code>CALC</code> &rarr; <code>8: LinReg(a+bx)</code> &rarr; Xlist: L1, Ylist: L2.</p>
              <p>2. 殘差會自動儲存於 <code>2nd</code> + <code>STAT</code> (LIST) &rarr; <code>RESID</code>。</p>
            </div>

            <h3>✍️ Class Exercise (課堂練習題)</h3>
            <p><strong>Question 3:</strong> 研究顯示房屋面積 ($X$, 平方英尺) 與售價 ($Y$, 萬元) 之迴歸式為 \(\hat{y} = 15 + 0.12 x\)，\(r^2 = 0.64\)。若某房屋面積 2000 平方英尺，實際售價 265 萬元，請計算其殘差並解釋 \(r^2 = 0.64\) 的情境意義。</p>
          `,
          teacherContent: `
            <div class="teacher-only-header">🔑 Teacher Answer Key & Rubrics (解答與評分標準)</div>
            <p><strong>Question 3 解答：</strong></p>
            <ol>
              <li>計算預測值：\(\hat{y} = 15 + 0.12(2000) = 15 + 240 = 255\) 萬元。</li>
              <li>計算殘差：\(\text{Residual} = y - \hat{y} = 265 - 255 = +10\) 萬元。（實際售價比預測高出 10 萬元）</li>
              <li>\(r^2 = 0.64\) 解釋：約有 64% 的房屋售價變異，可由房屋面積與售價之間的線性關係來解釋。</li>
            </ol>
            <div class="rubric-box">
              <strong>🎯 AP Scoring Rubric:</strong>
              <ul>
                <li><strong>E</strong>：殘差計算正確 (+10) 且 $r^2$ 解釋包含 "variability in Y", "accounted for by linear relationship with X"。缺一不可！</li>
              </ul>
            </div>
          `
        }
      ]
    },
    {
      id: "u3",
      code: "Unit 3",
      badgeColor: "#a855f7",
      title: "Probability, Random Variables & Distributions",
      subtitle: "古典機率、條件機率、隨機變數期望值與二項幾何分布",
      description: "掌握古典機率加法與乘法法則、條件機率 $P(A|B)$、獨立性檢定、離散隨機變數期望值 $E(X)$、變異數組合與二項分布 $B(n,p)$。",
      modules: [
        {
          id: "u3-m1",
          code: "Topic 3.1 - 3.12",
          title: "Probability Rules, Random Variables & Binomial Distributions",
          summary: "熟練獨立性證明 $P(A \cap B) = P(A)P(B)$、期望值與標準差運算、二項分布 PDF/CDF。",
          studentContent: `
            <div class="concept-box">
              <div class="concept-title">💡 Probability Rules & Independence</div>
              <p><strong>Conditional Probability (條件機率)</strong>：\[ P(A|B) = \frac{P(A \cap B)}{P(B)} \]</p>
              <p><strong>Test for Independence (獨立性檢定)</strong>：若且唯若符合以下任一條件，事件 A 與 B 獨立：</p>
              <ul>
                <li>\( P(A|B) = P(A) \) 或 \( P(B|A) = P(B) \)</li>
                <li>\( P(A \cap B) = P(A) \times P(B) \)</li>
              </ul>
            </div>

            <h3>1. Discrete Random Variables: Mean & Variance</h3>
            <p>\[ \mu_X = E(X) = \sum x_i P(x_i), \quad \sigma_X^2 = \sum (x_i - \mu_X)^2 P(x_i) \]</p>
            <p>若 $X$ 與 $Y$ 為獨立隨機變數，則 \( Var(X \pm Y) = Var(X) + Var(Y) \)。（**注意：變異數永遠相加！**）</p>

            <h3>2. Binomial Distribution $B(n, p)$ (二項分布 BINS)</h3>
            <p>需滿足 <strong>BINS</strong> 條件：<strong>B</strong>inary outcomes, <strong>I</strong>ndependent trials, <strong>N</strong>umber of trials fixed ($n$), <strong>S</strong>uccess probability fixed ($p$).</p>
            <p>\[ P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}, \quad \mu = n p, \quad \sigma = \sqrt{n p (1-p)} \]</p>

            <div class="ti84-box">
              <div class="ti84-title">📱 TI-84 二項分布計算步驟</div>
              <p>按 <code>2nd</code> + <code>VARS</code> (DISTR)：</p>
              <ul>
                <li><code>binompdf(n, p, k)</code>：求恰好等於 $k$ 次成功的機率 \(P(X = k)\)。</li>
                <li><code>binomcdf(n, p, k)</code>：求小於等於 $k$ 次成功的累積機率 \(P(X \le k)\)。</li>
              </ul>
            </div>

            <h3>✍️ Class Exercise (課堂練習題)</h3>
            <p><strong>Question 4:</strong> 某硬碟故障率為 $p = 0.05$。現隨機抽取 20 顆硬碟，求恰好有 2 顆硬碟故障的機率，並計算這 20 顆硬碟故障數量的期望值與標準差。</p>
          `,
          teacherContent: `
            <div class="teacher-only-header">🔑 Teacher Answer Key & Rubrics (解答與評分標準)</div>
            <p><strong>Question 4 解答：</strong></p>
            <ol>
              <li>\(P(X = 2) = \binom{20}{2} (0.05)^2 (0.95)^{18} = 190 \times 0.0025 \times 0.3972 \approx 0.1887\)</li>
              <li>期望值 \(\mu = n p = 20 \times 0.05 = 1.0\) 顆。</li>
              <li>標準差 \(\sigma = \sqrt{n p (1-p)} = \sqrt{20 \times 0.05 \times 0.95} = \sqrt{0.95} \approx 0.9747\) 顆。</li>
            </ol>
          `
        }
      ]
    },
    {
      id: "u4",
      code: "Unit 4",
      badgeColor: "#10b981",
      title: "Sampling Distributions & Inference for Proportions",
      subtitle: "抽樣分布、中央極限定理 (CLT) 與母體比例 Z 檢定/信賴區間",
      description: "深入 Sampling Distributions 抽樣分布概念、Central Limit Theorem (CLT)、1-Prop Z & 2-Prop Z 信賴區間與假設檢定、Chi-Square 卡方檢定。",
      modules: [
        {
          id: "u4-m1",
          code: "Topic 4.1 - 4.11",
          title: "Central Limit Theorem, Z-Intervals & Chi-Square Tests",
          summary: "掌握 1-Prop Z 檢定/區間條件檢驗 (Large Counts Condition) 與卡方檢定應用。",
          studentContent: `
            <div class="concept-box">
              <div class="concept-title">💡 Central Limit Theorem (CLT) 中央極限定理</div>
              <p>當樣本數 \(n\) 足夠大 (\(n \ge 30\)) 時，不論母體分布形狀為何，**樣本平均數的抽樣分布 \(\bar{x}\) 都將趨近於常態分布** \(N(\mu, \frac{\sigma}{\sqrt{n}})\)！</p>
            </div>

            <h3>1. Inference for 1-Sample Proportion (1-Prop Z Test/CI)</h3>
            <p><strong>Conditions Check (三大必檢查條件)</strong>：</p>
            <ol>
              <li><strong>Randomness</strong>: Random sample or random assignment.</li>
              <li><strong>10% Condition</strong>: \( n \le 0.10 N \) (保證獨立性).</li>
              <li><strong>Large Counts Condition</strong>: \( n p_0 \ge 10 \) 且 \( n(1-p_0) \ge 10 \) (保證抽樣分布接近常態).</li>
            </ol>
            <p> Confidence Interval: \[ \hat{p} \pm Z^* \sqrt{\frac{\hat{p}(1-\hat{p})}{n}} \]</p>

            <div class="frq-template-box">
              <div class="frq-template-title">📝 AP Four-Step Inference Template (推論四步驟黃金範本)</div>
              <p><strong>State:</strong> Define parameters (\(p\) or \(\mu\)), state hypotheses \(H_0, H_a\), set significance level \(\alpha = 0.05\).</p>
              <p><strong>Plan:</strong> Name procedure (e.g. 1-Prop Z Test), verify 3 conditions.</p>
              <p><strong>Do:</strong> Calculate test statistic \(Z = \frac{\hat{p} - p_0}{\sqrt{\frac{p_0(1-p_0)}{n}}}\) and p-value.</p>
              <p><strong>Conclude:</strong> Compare p-value with \(\alpha\). Reject \(H_0\) or fail to reject \(H_0\) in context.</p>
            </div>

            <h3>✍️ Class Exercise (課堂練習題)</h3>
            <p><strong>Question 5:</strong> 某市長宣稱支持率高於 50%。隨機調查 400 名市民，有 220 人表示支持。請進行 1-Prop Z Test（\(\alpha = 0.05\)），判斷是否有足夠證據支持市長的宣稱。</p>
          `,
          teacherContent: `
            <div class="teacher-only-header">🔑 Teacher Answer Key & Rubrics (解答與評分標準)</div>
            <p><strong>Question 5 解答：</strong></p>
            <ul>
              <li><strong>State:</strong> \(H_0: p = 0.50\) vs \(H_a: p > 0.50\)，其中 \(p\) 為全體市民支持率。\(\alpha = 0.05\)。</li>
              <li><strong>Plan:</strong> 1-Prop Z Test. 檢查條件：Random sample (已滿足)；\(400 \le 10\%\) 全體市民 (滿足)；\(400(0.5) = 200 \ge 10\)，\(400(0.5) = 200 \ge 10\) (Large Counts 滿足)。</li>
              <li><strong>Do:</strong> 樣本比例 \(\hat{p} = \frac{220}{400} = 0.55\)。標準誤 \(SE = \sqrt{\frac{0.5(0.5)}{400}} = 0.025\)。\(Z = \frac{0.55 - 0.50}{0.025} = 2.00\)。\(p\text{-value} = P(Z > 2.00) = 0.0228\)。</li>
              <li><strong>Conclude:</strong> 因為 \(p\text{-value} = 0.0228 < \alpha = 0.05\)，我們拒絕 \(H_0\)。有顯著統計證據支持市長支持率超過 50%。</li>
            </ul>
          `
        }
      ]
    },
    {
      id: "u5",
      code: "Unit 5",
      badgeColor: "#ff6b6b",
      title: "Inference for Means, Slopes & Advanced Models",
      subtitle: "母體平均數 t 檢定/區間、配對 t 檢定與迴歸斜率推論",
      description: "掌握 $t$-Distribution 自由度 (df)、1-Sample $t$ & 2-Sample $t$ CI/Test、Paired $t$-Test 配對檢定，以及迴歸斜率 $\\beta_1$ 之 $t$ 檢定與信賴區間。",
      modules: [
        {
          id: "u5-m1",
          code: "Topic 5.1 - 5.9",
          title: "t-Distributions, Means Inference & Linear Regression Slope Inference",
          summary: "精通 t 檢定三大條件 (Normal/Large Sample Condition)、Paired t vs 2-Sample t 的差異判定與迴歸斜率檢定。",
          studentContent: `
            <div class="concept-box">
              <div class="concept-title">💡 Why t-Distribution instead of Z?</div>
              <p>當母體標準差 \(\sigma\) 未知時，我們使用樣本標準差 \(s_x\) 代替，此時統計量服從 **$t$-Distribution (自由度 \(df = n - 1\))**。自由度越大，$t$ 分布越接近標準常態分布！</p>
            </div>

            <h3>1. 1-Sample t-Confidence Interval & Test</h3>
            <p>\[ \bar{x} \pm t^* \frac{s_x}{\sqrt{n}}, \quad t = \frac{\bar{x} - \mu_0}{\frac{s_x}{\sqrt{n}}} \]</p>
            <p><strong>Normal/Large Sample Condition Check (平均數正態條件)</strong>：</p>
            <ul>
              <li>若 \(n \ge 30\)：依據 CLT 直接滿足。</li>
              <li>若 \(n < 30\)：必須繪製樣本資料圖形（Dotplot/Boxplot），確認無強烈偏態 (No strong skewness) 且無極端值 (No outliers)。</li>
            </ul>

            <h3>2. Paired t-Test vs Two-Sample t-Test (配對檢定 vs 雙樣本檢定)</h3>
            <div class="warning-box">
              <div class="warning-title">⚠️ AP 核心分水嶺概念</div>
              <p><strong>Paired t-Test (配對 t 檢定)</strong>：同一組個體接受前後測試 (Before/After)，或配對成對的個體。分析焦點為**個體差異值 \(D = X_1 - X_2\)** 的單母體平均數 \(\mu_D\)！<br>
              <strong>Two-Sample t-Test (雙樣本 t 檢定)</strong>：兩組獨立進行抽樣的樣本。分析兩獨立母體平均數之差 \(\mu_1 - \mu_2\)。</p>
            </div>

            <h3>3. Inference for Regression Slope $\beta_1$ (迴歸斜率推論)</h3>
            <p>\[ t = \frac{b - \beta_0}{SE_b} \quad \text{with } df = n - 2 \]</p>

            <div class="ti84-box">
              <div class="ti84-title">📱 TI-84 平均數與斜率檢定按鍵步驟</div>
              <p>按 <code>STAT</code> &rarr; <code>TESTS</code>：</p>
              <ul>
                <li><code>2: T-Test</code> (單樣本 t 檢定) | <code>4: 2-SampTTest</code> (雙樣本 t 檢定)</li>
                <li><code>LinRegTTest</code> (迴歸斜率 t 檢定)</li>
              </ul>
            </div>

            <h3>✍️ Class Exercise (課堂練習題)</h3>
            <p><strong>Question 6:</strong> 10 名學生參加統計輔導班前後的測試分數如下。請說明為何應選擇 Paired t-Test 而非 Two-Sample t-Test？</p>
          `,
          teacherContent: `
            <div class="teacher-only-header">🔑 Teacher Answer Key & Rubrics (解答與評分標準)</div>
            <p><strong>Question 6 解答：</strong></p>
            <p>因為這 10 組分數來自「同一批學生」輔導前與輔導後的成對觀察值（Dependent/Paired observations），個體間存在自然配對關係，故必須將每位學生的進步分數相減（\(D = \text{Post} - \text{Pre}\)），進行 **Paired t-Test**。</p>
          `
        }
      ]
    },
    {
      id: "exam",
      code: "Exam Center",
      badgeColor: "#ec4899",
      title: "AP® Statistics Exam Strategy & FRQ Phrasing Master",
      subtitle: "5 分大考衝刺、FRQ 四步驟黃金語法與核心指標速查",
      description: "收錄 AP Statistics 官方 FRQ State-Plan-Do-Conclude 評分規準、條件檢驗速查表與高頻扣分陷阱精解。",
      modules: [
        {
          id: "exam-m1",
          code: "Master Class",
          title: "FRQ 10 分題滿分答題模板庫 (State-Plan-Do-Conclude)",
          summary: "直擊 AP 閱卷官給分點，建立標準化英文回答邏輯。",
          studentContent: `
            <div class="frq-template-box">
              <div class="frq-template-title">🏆 State-Plan-Do-Conclude 官方標準框架</div>
              
              <h4>1. Confidence Interval Interpretation (信賴區間解釋)</h4>
              <p class="code-quote">"We are [C]% confident that the true [population parameter in context] lies within the interval [lower bound, upper bound]."</p>
              
              <h4>2. Confidence Level Interpretation (信賴水準解釋 - 高頻必考!)</h4>
              <p class="code-quote">"If we were to repeat this sampling procedure many times, about [C]% of the resulting confidence intervals would capture the true [population parameter]."</p>

              <h4>3. P-Value Interpretation (P 值情境解釋)</h4>
              <p class="code-quote">"Assuming that the null hypothesis $H_0$ is true (i.e. [null condition in context]), there is a [p-value] probability of obtaining a sample statistic as extreme as or more extreme than the one observed."</p>

              <h4>4. Power of a Test (檢定力解釋)</h4>
              <p class="code-quote">"The probability of correctly rejecting the false null hypothesis $H_0$ when the true parameter value is [alternative value]."</p>
            </div>
          `,
          teacherContent: `
            <div class="teacher-only-header">🔑 Teacher Notes for AP Exam Coaching</div>
            <p>提醒學生：Confidence Level 解釋考的是「方法的長期表現 (Long-run success rate of the method)」，絕對不能寫成「真正參數落在這個區間的機率是 95%」！後者在頻率學派中是 0 或 1 的定值！</p>
          `
        }
      ]
    }
  ],

  glossary: [
    { term: "Categorical Variable", zh: "類別變數", desc: "Places an individual into one of several groups or categories." },
    { term: "Quantitative Variable", zh: "數值變數", desc: "Takes numerical values for which arithmetic operations make sense." },
    { term: "SOCS", zh: "分布描述法則", desc: "Shape, Outliers, Center, Spread for describing quantitative distributions." },
    { term: "1.5 x IQR Rule", zh: "極端值檢定法則", desc: "Outlier rule: values < Q1 - 1.5*IQR or > Q3 + 1.5*IQR." },
    { term: "Standardized Z-Score", zh: "標準化 Z 分數", desc: "Measures distance from mean in standard deviation units: z = (x - mu) / sigma." },
    { term: "Simple Random Sample (SRS)", zh: "簡單隨機抽樣", desc: "Every group of n individuals has an equal chance of being selected." },
    { term: "Stratified Random Sampling", zh: "分層隨機抽樣", desc: "Divide population into homogeneous strata, then take SRS from each stratum." },
    { term: "Cluster Sampling", zh: "群集抽樣", desc: "Divide population into heterogeneous clusters, randomly select clusters and census all in selected clusters." },
    { term: "Confounding Variable", zh: "混淆變數", desc: "A variable associated with both explanatory and response variables, making causality unclear." },
    { term: "LSRL (Least-Squares Regression Line)", zh: "最小二乘迴歸線", desc: "Line y_hat = a + bx that minimizes the sum of squared residuals." },
    { term: "Residual", zh: "殘差", desc: "Difference between actual and predicted value: e = y - y_hat." },
    { term: "Coefficient of Determination (r^2)", zh: "判定係數", desc: "Proportion of variability in Y explained by the linear relationship with X." },
    { term: "Mutually Exclusive (Disjoint)", zh: "互斥事件", desc: "Two events that cannot occur simultaneously: P(A and B) = 0." },
    { term: "Independent Events", zh: "獨立事件", desc: "Occurrence of one event does not change the probability of the other: P(A|B) = P(A)." },
    { term: "Binomial Distribution", zh: "二項分布", desc: "Distribution of successes in n independent Bernoulli trials with probability p." },
    { term: "Central Limit Theorem (CLT)", zh: "中央極限定理", desc: "Sampling distribution of sample mean x_bar approaches Normal for large n (>=30)." },
    { term: "Type I Error", zh: "第一型錯誤 (α 錯誤)", desc: "Rejecting a true null hypothesis H0." },
    { term: "Type II Error", zh: "第二型錯誤 (β 錯誤)", desc: "Failing to reject a false null hypothesis H0." },
    { term: "Power of a Test", zh: "檢定力 (1 - β)", desc: "Probability of correctly rejecting a false null hypothesis." },
    { term: "p-value", zh: "p 值", desc: "Probability of getting evidence as or more extreme than observed, assuming H0 is true." }
  ]
};
