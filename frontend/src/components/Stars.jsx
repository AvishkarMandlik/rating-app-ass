import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';

export default function Stars({ value = 0, onChange, className = '' }) {
  return (
    <div className={`flex ${className}`}>
      {[1, 2, 3, 4, 5].map(n => (
        <button key={n} type="button" onClick={() => onChange?.(n)}>
          <FontAwesomeIcon
            icon={n <= value ? solidStar : regularStar}
            className="text-yellow-400 h-5 w-5"
          />
        </button>
      ))}
    </div>
  );
}