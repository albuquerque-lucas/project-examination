<?php

namespace Database\Seeders;

use App\Models\EducationalLevel;
use Illuminate\Database\Seeder;
use App\Models\Examination;

class ExaminationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $educationalLevels = EducationalLevel::all()->pluck('id')->toArray();

        $examinationData = [
            // Títulos de concursos públicos brasileiros (fictícios ou reais)
            'Concurso de Professores da Prefeitura',
            'Concurso Polícia Federal',
            'Concurso Auditor Fiscal da Receita Federal',
            'Concurso para Juiz Federal',
            'Concurso para Desembargador Regional',
            'Concurso para Promotor de Justiça',
            'Concurso para Agente da Polícia Rodoviária Federal',
            'Concurso para Escrivão da Polícia Civil',
            'Concurso para Soldado da Polícia Militar',
            'Concurso para Analista da ANVISA',
            'Concurso para Agente da CVM',
            'Concurso para Especialista em Regulação da ANATEL',
            'Concurso para Professor Universitário',
            'Concurso para Diplomata',
            'Concurso para Procurador da República',
            'Concurso para Técnico do INSS',
            'Concurso para Agente de Trânsito',
            'Concurso para Agente Penitenciário',
            'Concurso para Professor da Rede Estadual de São Paulo',
            'Concurso para Auditor Fiscal do Estado do Rio de Janeiro',
            'Concurso para Defensor Público do Estado de Minas Gerais',
            'Concurso para Caixa Econômica Federal',
            'Concurso para Banco do Brasil',
            'Concurso para BNDES',
            'Concurso para Advogado da União',
            'Concurso para Oficial de Justiça',
            'Concurso para Contador do Tribunal de Contas da União',
            'Concurso para Agente de Saúde Pública',
            'Concurso para Assistente Social',
            'Concurso para Bibliotecário',
            'Concurso para Engenheiro da Petrobrás',
            'Concurso para Técnico de Enfermagem',
            'Concurso para Agente de Combate às Endemias',
            'Concurso para Fiscal de Rendas',
            'Concurso para Tradutor e Intérprete',
            'Concurso para Perito Criminal',
            'Concurso para Médico Legista',
            'Concurso para Cientista de Dados',
            'Concurso para Analista de Controle Externo do TCU',
            'Concurso para Procurador do Estado',
            'Concurso para Defensor Público da União',
            'Concurso para Tribunal de Justiça do Distrito Federal e Territórios (TJDFT)',
            'Concurso para Agente Florestal',
            'Concurso para Agente de Imigração',
            'Concurso para Meteorologista',
            'Concurso para Geólogo',
        ];

        foreach ($examinationData as $title) {
            $educationalLevelId = $educationalLevels[array_rand($educationalLevels)];

            Examination::create([
                'title' => $title,
                'active' => true,  // Atribuindo valor fixo para active
                'institution' => 'Governo Federal',  // Adapte a instituição se necessário
                'registration_start_date' => now()->subDays(15),  // Início das inscrições 15 dias atrás
                'registration_end_date' => now()->addWeeks(2),  // Término das inscrições em duas semanas
                'exams_start_date' => now()->addWeeks(4),  // Início das provas em quatro semanas
                'exams_end_date' => now()->addWeeks(5),  // Término das provas em cinco semanas
                'educational_level_id' => $educationalLevelId,
            ]);
        }
    }
}
