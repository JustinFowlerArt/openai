export interface iResponse {
	result: string;
}

export interface iError {
	code: number;
	messages: string;
}

export interface iConversation {
	human: string;
	ai: string;
}

export interface iCharacter {
	name: string;
	description: string;
}