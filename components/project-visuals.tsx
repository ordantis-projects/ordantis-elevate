import styles from "./project-design.module.css";

type Visual = "forecast" | "signals" | "network";

// Schematics explain relationships only: no performance measurements or client data.
export function ProjectVisual({ kind, description }: { kind: Visual; description: string }) {
  return <figure className={`${styles.figure} ${styles[kind]}`}>
    <div className={styles.figureHeader} aria-hidden="true">
      <span>{kind === "forecast" ? "Observación → previsión" : kind === "signals" ? "Contraste de señales" : "Asignación con restricciones"}</span>
      <span className={styles.figureMark}>ORD / {kind === "forecast" ? "01" : kind === "signals" ? "02" : "03"}</span>
    </div>
    <svg viewBox="0 0 480 230" role="img" aria-label={description} className={styles.diagram}>
      <g className={styles.gridLines}>
        {[42, 87, 132, 177, 222].map((y) => <path key={y} d={`M24 ${y}H456`} />)}
        {[24, 96, 168, 240, 312, 384, 456].map((x) => <path key={x} d={`M${x} 20V222`} />)}
      </g>
      {kind === "forecast" ? <>
        <path className={styles.interval} d="M265 99L303 79L340 84L377 43L415 53L456 23V139L415 135L377 111L340 136L303 117L265 99Z" />
        <path className={styles.referenceLine} d="M24 181L52 171L80 185L108 130L136 145L164 118L192 150L220 85L248 109L265 99" />
        <path className={styles.signalLine} d="M265 99L303 98L340 110L377 77L415 94L456 81" />
        <path className={styles.dividerLine} d="M265 20V222" />
        <circle cx="265" cy="99" r="6" className={styles.node} />
      </> : kind === "signals" ? <>
        <path className={styles.interval} d="M24 62H456V94H24ZM24 152H456V184H24Z" />
        <path className={styles.referenceLine} d="M24 83L56 72L86 84L116 77L146 88L176 73L206 79L225 77L240 28L255 82L282 73L312 86L342 77L372 84L402 76L432 83L456 77" />
        <path className={styles.signalLine} d="M24 173L56 162L86 174L116 167L146 178L176 163L206 169L225 166L240 160L255 172L282 163L312 176L342 167L372 174L402 166L432 173L456 167" />
        <path className={styles.dividerLine} d="M240 20V210" />
        <circle cx="240" cy="28" r="12" className={styles.ring} />
        <circle cx="240" cy="160" r="6" className={styles.node} />
      </> : <>
        <g className={styles.networkLines}><path d="M64 70L175 45L287 86L414 46M64 70L120 172L241 190L287 86L398 174L414 46M175 45L120 172M175 45L241 190M64 70L287 86M241 190L398 174" /></g>
        <g className={styles.networkReach}><circle cx="175" cy="45" r="37" /><circle cx="398" cy="174" r="37" /></g>
        <path className={styles.signalLine} d="M64 70L175 45L287 86L398 174L241 190L120 172" />
        {[[64, 70], [175, 45], [287, 86], [414, 46], [120, 172], [241, 190], [398, 174]].map(([x, y]) => <circle key={x} cx={x} cy={y} r="7" className={styles.node} />)}
        <rect x="166" y="36" width="18" height="18" className={styles.resource} />
        <rect x="389" y="165" width="18" height="18" className={styles.resource} />
      </>}
    </svg>
    <figcaption>Esquema ilustrativo · sin datos de clientes</figcaption>
  </figure>;
}
