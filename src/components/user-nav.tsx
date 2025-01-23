import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getInitials, getFullName } from '@/lib/utils';
import { Button } from './ui/button';

type UserNavProps = {
  profile: any;
};

export function UserNav(
  { profile }: UserNavProps) {
  const navigate = useNavigate();

  const fullName = profile ? getFullName(profile) : '';
  const initials = getInitials(fullName).toUpperCase();


  const logoutUser = async () => {
    localStorage.clear();
    navigate('/sign-in');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
          <Avatar className='h-8 w-8'>
            <AvatarFallback>{`${initials[0] || ''}${initials[1] || ''}`}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logoutUser}>Se déconnecter</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
