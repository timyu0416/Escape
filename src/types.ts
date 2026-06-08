export interface InventoryItem {
  id: string;
  name: string;
  icon: string;
  description: string;
  acquired: boolean;
}

export interface LevelState {
  id: number;
  name: string;
  completed: boolean;
  active: boolean;
}

export interface CharacterProfile {
  id: string;
  name: string;
  role: string;
  avatar: string;
  description: string;
  feature?: string;
  quote?: string;
  hiddenAgenda: string;
  goal?: string;
}

export interface BookingSlot {
  time: string;
  status: "available" | "limited" | "full";
  price: number;
  note?: string;
}
