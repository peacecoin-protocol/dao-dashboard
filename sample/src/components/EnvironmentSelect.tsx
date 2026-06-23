import type { Environment } from '../types/api';

interface Props {
  value: Environment;
  onChange: (env: Environment) => void;
  id?: string;
}

export function EnvironmentSelect({ value, onChange, id = 'environment' }: Props) {
  return (
    <label className="field">
      <span>Environment</span>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value as Environment)}
      >
        <option value="dev">dev</option>
        <option value="stg">stg</option>
        <option value="production">production</option>
      </select>
    </label>
  );
}
