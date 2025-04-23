export interface VoiceSelection {
    voice: string
    range: [number, number]
    color: string
}

export interface AdvanceSettingsInterface {
    f0_method: string,
    cover_background_vocals: string,
    overall_pitch: number,
    main_vocals_volume: number,
    backup_vocals_volume: number,
    inst_volume: number,
    index_rate: number,
    filter_radius: number,
    rms_mix_rate: number,
    protect_rate: number,
}

export const AdvancedSettingsDefaultData: AdvanceSettingsInterface = {
    f0_method: "rmvpe",
    cover_background_vocals: "false",
    overall_pitch: 0,
    main_vocals_volume: 0,
    backup_vocals_volume: 0,
    inst_volume: 0,
    index_rate: 0.5,
    filter_radius: 3,
    rms_mix_rate: 0.25,
    protect_rate: 0.33,
}

export interface PlanInterface {
    id: 'free' | 'basic' | 'pro',
    name: string,
    price: number,
    features: string[],
}