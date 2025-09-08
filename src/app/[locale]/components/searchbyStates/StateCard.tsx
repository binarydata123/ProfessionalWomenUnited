import Link from 'next/link';
import { State } from '../../types';

interface StateCardProps {
    state: State;
}

export default function StateCard({ state }: StateCardProps) {
    return (
        <Link href={`/us-states?state=${state.abbreviation}`}>
            <div className="bg-white p-6 rounded-xl shadow-lg card-hover border-2 border-transparent hover:border-coral group cursor-pointer">
                <h3 className="text-lg font-semibold text-navy group-hover:text-coral transition-colors">
                    {state.name}
                </h3>
            </div>
        </Link>
    );
}