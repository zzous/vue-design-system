export type IconSize = 'xs' | 'small' | 'medium' | 'large' | 'xl';
export type IconName =
  | 'arrowUp' | 'arrowDown' | 'arrowLeft' | 'arrowRight'
  | 'chevronUp' | 'chevronDown' | 'chevronLeft' | 'chevronRight'
  | 'chevronLeftDouble' | 'chevronRightDouble'
  | 'search' | 'send' | 'plus' | 'minus' | 'close' | 'check'
  | 'download' | 'upload' | 'edit' | 'trash' | 'copy'
  | 'user' | 'users' | 'settings' | 'home' | 'menu'
  | 'bell' | 'eye' | 'eyeOff' | 'lock' | 'unlock'
  | 'info' | 'warning' | 'error' | 'success'
  | 'calendar' | 'clock' | 'filter' | 'sort' | 'refresh'
  | 'externalLink' | 'link' | 'attach' | 'image'
  | 'creditCard' | 'transfer' | 'wallet'
  | 'monitor' | 'laptop' | 'server' | 'database' | 'cpu'
  | 'cloud' | 'cloudUpload' | 'cloudDownload' | 'wifi' | 'globe'
  | 'terminal' | 'code' | 'gitBranch' | 'layers' | 'package' | 'bug' | 'activity'
  | 'shield' | 'shieldCheck'
  | 'rocket';

export interface IconProps {
  name: IconName;
  size?: IconSize | number;
  color?: string;
  class?: string;
  style?: Record<string, string | number>;
  ariaLabel?: string;
  ariaHidden?: boolean;
}
