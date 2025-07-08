import '../App.css';
import { HashLoader } from 'react-spinners';

export default function Loading() {
  return (
    <div className="LoadingBackground" id="LoadingBackground">
      <HashLoader className="LoadingSpinner" color="hsl(0, 0%, 90%)" size={50} thickness={10} />
    </div>
  );
}