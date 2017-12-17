import { NgModule } from '@angular/core';
import { AverageHourlyGraphComponent } from './average-hourly-graph/average-hourly-graph';
import { FullDataGraphicComponent } from './full-data-graphic/full-data-graphic';
@NgModule({
	declarations: [AverageHourlyGraphComponent,
    FullDataGraphicComponent],
	imports: [],
	exports: [AverageHourlyGraphComponent,
    FullDataGraphicComponent]
})
export class ComponentsModule {}
