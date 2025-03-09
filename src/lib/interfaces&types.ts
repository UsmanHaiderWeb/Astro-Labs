export interface VoiceSelection {
  voice: string
  range: [number, number]
  color: string
}

export interface AdvanceSettingsInterface {
  pitchMethod: string,
  applyAIOnBackground: string,
  pitchBackgroundInstrumental: number,
  mainVocalsVolume: number,
  backgroundVocalsVolume: number,
  instrumentalsVolume: number,
  indexRate: number,
  filterRadius: number,
  rmsMixRate: number,
  protectRate: number,
}

export const AdvancedSettingsDefaultData = {
  pitchMethod: "rmvpe",
  applyAIOnBackground: "false",
  pitchBackgroundInstrumental: 0,
  mainVocalsVolume: 0,
  backgroundVocalsVolume: 0,
  instrumentalsVolume: 0,
  indexRate: 0.5,
  filterRadius: 3,
  rmsMixRate: 0.25,
  protectRate: 0.33,
}