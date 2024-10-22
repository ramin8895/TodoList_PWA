interface ItemData {
    value: string;
    id?:number
  }
  
interface ItemDataList {
    value: string;
    id:number
  }
 
  interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
  }
  