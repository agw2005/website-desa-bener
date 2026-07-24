CREATE TABLE Aparatur (
    aparatur_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nama VARCHAR(255) NOT NULL,
    jabatan VARCHAR(255) NOT NULL,
    telepon VARCHAR(255) NOT NULL,
    foto BYTEA NOT NULL,
    kata_sandi VARCHAR(255) NOT NULL
);

CREATE TABLE Umum (
    umum_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nama VARCHAR(255) NOT NULL,
    nik VARCHAR(255) NOT NULL,
    kata_sandi VARCHAR(255) NOT NULL
);

CREATE TABLE Pelayanan (
    pelayanan_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nama VARCHAR(255)
);

CREATE TABLE Pengajuan (
    pengajuan_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    jenis_pelayanan INT NOT NULL,
    status VARCHAR(20) CHECK (status in ('dalam antrian', 'disetujui', 'ditolak')),
    alasan_penolakan TEXT NOT NULL,
    ditolak_oleh INT,
    waktu_upload INT NOT NULL,

    CONSTRAINT jenis_pelayanan_ajuan 
        FOREIGN KEY (jenis_pelayanan) 
        REFERENCES Pelayanan(pelayanan_id) 
        ON DELETE CASCADE,

    CONSTRAINT aparatur_penolak 
        FOREIGN KEY (ditolak_oleh)
        REFERENCES Aparatur(aparatur_id) 
        ON DELETE SET NULL
);

CREATE TABLE Lampiran_Pengajuan (
    lampiran_pengajuan_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    pengajuan_id INT,
    nama_file VARCHAR(255) NOT NULL,
    besar_file INT NOT NULL,
    isi_file BYTEA NOT NULL,
    deskripsi VARCHAR(255) NOT NULL,

    CONSTRAINT lampiran_suatu_ajuan 
        FOREIGN KEY (pengajuan_id) 
        REFERENCES Pengajuan(pengajuan_id) 
        ON DELETE CASCADE
);

CREATE TABLE Komentar (
    komentar_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nama VARCHAR(255) NOT NULL,
    surel VARCHAR(255) NOT NULL,
    isi TEXT NOT NULL,
    waktu_upload INT NOT NULL
);

CREATE TABLE Label (
    label_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nama VARCHAR(255) NOT NULL
);

CREATE TABLE Artikel (
    artikel_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    judul VARCHAR(255) NOT NULL,
    isi TEXT,
    waktu_upload INT NOT NULL
);

CREATE TABLE Label_Artikel (
    artikel_id INT,
    label_id INT,

    CONSTRAINT artikel_dari_label 
        FOREIGN KEY (artikel_id) 
        REFERENCES Artikel(artikel_id) 
        ON DELETE CASCADE,

    CONSTRAINT label_dari_artikel 
        FOREIGN KEY (label_id) 
        REFERENCES Label(label_id) 
        ON DELETE CASCADE
);

CREATE TABLE Lampiran_Artikel (
    lampiran_artikel_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    artikel_id INT,
    nama_file VARCHAR(255) NOT NULL,
    besar_file INT NOT NULL,
    isi_file BYTEA NOT NULL,

    CONSTRAINT artikel_dari_lampiran 
        FOREIGN KEY (artikel_id) 
        REFERENCES Artikel(artikel_id) 
        ON DELETE CASCADE
);

CREATE TABLE Dusun (
    dusun_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nama VARCHAR(255) NOT NULL,
    rt INT NOT NULL,
    populasi INT NOT NULL,
    keluarga INT NOT NULL,
    laki INT NOT NULL,
    perempuan INT NOT NULL,
    umkm INT NOT NULL,
    islam INT NOT NULL,
    protestanisme INT NOT NULL,
    katolisisme INT NOT NULL,
    hinduisme INT NOT NULL,
    buddhisme INT NOT NULL,
    konfusianisme INT NOT NULL,
    tunadaksa INT NOT NULL,
    tunanetra INT NOT NULL,
    tunarungu INT NOT NULL,
    tunawicara INT NOT NULL,
    tunagrahita INT NOT NULL,
    tunalaras INT NOT NULL,
    kps INT NOT NULL,
    ks_satu INT NOT NULL,
    ks_dua INT NOT NULL,
    ks_tuga INT NOT NULL,
    ks_tiga_plus INT NOT NULL
);

CREATE TABLE Profil (
    profil_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    deskripsi_sekilas TEXT,
    kode_desa INT,
    kecamatan VARCHAR(255),
    kabupaten_kota VARCHAR(255),
    provinsi VARCHAR(255),
    tahun_pembentukan INT,
    luas DECIMAL,
    koordinat VARCHAR(255),
    tipologi VARCHAR(255),
    klasifikasi VARCHAR(255),
    kategori VARCHAR(255),
    batas_timur VARCHAR(255),
    batas_barat VARCHAR(255),
    batas_selatan VARCHAR(255),
    batas_utara VARCHAR(255),
    sejarah TEXT,
    peta BYTEA,
    tautan_kalender VARCHAR(255)
);

CREATE TABLE Visi (
    visi_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    isi TEXT
);

CREATE TABLE Misi (
    misi_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    isi TEXT
);

CREATE TABLE Apbdes (
    apbdes_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    tahun INT
);

CREATE TABLE Lampiran_Apbdes (
    apbdes_file_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    apbdes_id INT,
    nama_file VARCHAR(255),
    besar_file INT NOT NULL,
    isi_file BYTEA NOT NULL,

    CONSTRAINT lampiran_dari_apbdes 
        FOREIGN KEY (apbdes_id) 
        REFERENCES Apbdes(apbdes_id) 
        ON DELETE CASCADE
);

CREATE TABLE Wisata (
    wisata_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nama VARCHAR(255) NOT NULL,
    deskripsi TEXT NOT NULL,
    foto BYTEA NOT NULL
);

CREATE TABLE Umkm (
    umkm_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nama VARCHAR(255) NOT NULL,
    dusun_id INT,
    deskripsi TEXT NOT NULL,
    foto BYTEA NOT NULL,

    CONSTRAINT dusun_dari_umkm 
        FOREIGN KEY (dusun_id) 
        REFERENCES Dusun(dusun_id) 
        ON DELETE CASCADE
);

CREATE TABLE Kontak_Umkm (
    kontak_umkm_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    umkm_id INT,
    jenis_kontak VARCHAR(255),
    isi VARCHAR(255),
    tautan VARCHAR(255),

    CONSTRAINT umkm_dari_kontak 
        FOREIGN KEY (umkm_id) 
        REFERENCES Umkm(umkm_id) 
        ON DELETE CASCADE
);

INSERT INTO Profil (
    deskripsi_sekilas,
    kode_desa,
    kecamatan,
    kabupaten_kota,
    provinsi,
    tahun_pembentukan,
    luas,
    koordinat,
    tipologi,
    klasifikasi,
    kategori,
    batas_timur,
    batas_barat,
    batas_selatan,
    batas_utara,
    sejarah,
    peta,
    tautan_kalender
) VALUES (
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL
)