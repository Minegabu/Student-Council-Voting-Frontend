// This is required for ovveriding the Session type
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Nextauth from 'next-auth';

declare module 'next-auth' {
    interface Session {
        user: {
            name: string;
            email: string;
            image: string;
        };
    }
}
