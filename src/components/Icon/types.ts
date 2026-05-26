export type IconSize = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
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
  | 'rocket'
  // UI Controls
  | 'moreHorizontal' | 'moreVertical' | 'grid' | 'list'
  | 'zoomIn' | 'zoomOut' | 'maximize' | 'minimize' | 'gripVertical'
  // Favorites / Social
  | 'star' | 'starFilled' | 'heart' | 'heartFilled'
  | 'bookmark' | 'bookmarkFilled' | 'thumbsUp' | 'thumbsDown'
  // Communication
  | 'mail' | 'phone' | 'message' | 'share'
  // Location
  | 'mapPin'
  // Theme
  | 'sun' | 'moon'
  // Media
  | 'play' | 'pause' | 'volumeUp' | 'volumeMute'
  | 'mic' | 'micOff' | 'camera' | 'video'
  // Files
  | 'fileText' | 'filePlus' | 'folder' | 'folderOpen'
  // Analytics
  | 'barChart' | 'lineChart' | 'pieChart'
  // Misc
  | 'tag' | 'flag' | 'help' | 'logout' | 'hash' | 'at';

export interface IconProps {
  name: IconName;
  size?: IconSize | number;
  color?: string;
  ariaLabel?: string;
  ariaHidden?: boolean;
}
