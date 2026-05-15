export function SalaryCostChange({
  variant = 'NEUTRAL',
  children,
}: {
  variant?: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE',
  children: any,
}) {
  return (
    <span style={{
      display: 'inline-block',
      padding: '.15em .35em',
      background: '#ffcc00',
      color: '#222',
      borderRadius: '6px',
      boxSizing: 'border-box',
      textAlign: 'center',
      whiteSpace: 'nowrap',
    }}>
      {children}
    </span>
  );
}
