import styles from './Button.module.css'

export default function Button({
  variant = 'primary',
  size = 'md',
  block = false,
  as: Tag = 'button',
  className = '',
  ...rest
}) {
  const cls = [styles.base, styles[variant], styles[size], block && styles.block, className].filter(Boolean).join(' ')
  return <Tag className={cls} {...rest} />
}
