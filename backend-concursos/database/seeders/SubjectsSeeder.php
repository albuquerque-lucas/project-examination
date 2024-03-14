<?php

namespace Database\Seeders;

use App\Models\EducationalLevel;
use App\Models\StudyArea;
use Illuminate\Database\Seeder;
use App\Models\Subject;

class SubjectsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $studyAreas = [
            'Ensino Médio' => [
                'Matemática',
                'Português',
                'Inglês',
                'História',
                'Geografia',
                'Física',
            ],
            'Direito' => [
                'Direito Constitucional',
                'Direito Civil',
                'Direito Penal III',
                'Direito Processual Civil',
                'Direito do Trabalho',
                'Direito Administrativo',
            ],
            'Medicina' => [
                'Anatomia Humana VI',
                'Fisiologia Humana',
                'Bioquímica',
                'Patologia',
                'Farmacologia',
                'Semiologia Médica',
            ],
            'Engenharia' => [
                'Cálculo',
                'Física II',
                'Química',
                'Mecânica dos Sólidos',
                'Eletromagnetismo',
                'Programação em Python',
            ],
            'Economia' => [
                'Microeconomia',
                'Macroeconomia',
                'Econometria',
                'Finanças',
                'Estatística',
                'Matemática para Economia',
            ],
            'Sociologia' => [
                'Teoria Sociológica',
                'Metodologia de Pesquisa',
                'Sociologia da Desigualdade',
                'Sociologia da Família',
                'Sociologia do Trabalho',
                'Sociologia da Cultura',
            ],
            'Psicologia' => [
                'Psicologia Geral',
                'Psicologia do Desenvolvimento',
                'Psicologia Social',
                'Psicologia da Personalidade',
                'Psicologia Clínica',
                'Psicologia Cognitiva',
            ],
            'Educação' => [
                'Fundamentos da Educação',
                'Didática',
                'História da Educação',
                'Políticas Educacionais',
                'Gestão Educacional',
                'Educação Inclusiva',
            ],
            'Tecnologia' => [
                'Programação em Java',
                'Redes de Computadores',
                'Banco de Dados',
                'Desenvolvimento Web',
                'Inteligência Artificial',
                'Segurança da Informação',
            ],
            'Finanças' => [
                'Contabilidade',
                'Análise de Investimentos',
                'Matemática Financeira',
                'Mercado de Capitais',
                'Gestão de Riscos',
                'Finanças Corporativas',
            ],
            'Filosofia' => [
                'História da Filosofia',
                'Teoria do Conhecimento',
                'Ética',
                'Estética',
                'Lógica',
                'Metafísica',
            ],
            'Educação Física' => [
                'Anatomia Humana',
                'Fisiologia do Exercício',
                'Biomecânica',
                'Cinesiologia',
                'Pedagogia do Esporte',
                'Treinamento Desportivo',
            ],
            'Segurança Pública' => [
                'Direito Penal',
                'Direito Processual Penal',
                'Criminologia',
                'Polícia Científica',
                'Medicina Legal',
                'Técnicas Policiais',
            ],
            'Saúde Pública' => [
                'Epidemiologia',
                'Saúde Coletiva',
                'Gestão em Saúde',
                'Políticas Públicas de Saúde',
                'Promoção da Saúde',
                'Vigilância em Saúde',
            ],
        ];

        $educationalLevels = EducationalLevel::pluck('id')->toArray();

        foreach ($studyAreas as $areaName => $subjects) {
            $studyArea = StudyArea::where('area', $areaName)->first();

            foreach ($subjects as $subjectTitle) {
                Subject::create([
                    'study_area_id' => $studyArea->id,
                    'educational_level_id' => array_rand(array_flip($educationalLevels)),
                    'title' => $subjectTitle,
                ]);
            }
        }
    }
}
