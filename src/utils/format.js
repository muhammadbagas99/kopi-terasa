export const rp = n => 'Rp ' + Number(n || 0).toLocaleString('id-ID')
export const tgl = iso => new Date(iso).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })
